"""
🤖 MLOps FastAPI Template
Production-ready ML model deployment with monitoring and experiment tracking
"""

import asyncio
import logging
import os
from datetime import datetime
from typing import Dict, List, Optional, Any

import joblib
import mlflow
import numpy as np
import pandas as pd
from evidently.report import Report
from evidently.metric_suite import DataDriftSuite
from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, validator
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import structlog

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

# Initialize FastAPI app
app = FastAPI(
    title="🤖 MLOps FastAPI Template",
    description="Production-ready ML model deployment with monitoring and experiment tracking",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model and data
current_model = None
reference_data = None
model_metrics = {}

# Pydantic models for API
class PredictionRequest(BaseModel):
    """Request model for predictions"""
    features: List[float]
    model_version: Optional[str] = "latest"
    
    @validator('features')
    def validate_features(cls, v):
        if len(v) == 0:
            raise ValueError('Features cannot be empty')
        return v

class PredictionResponse(BaseModel):
    """Response model for predictions"""
    prediction: int
    confidence: float
    model_version: str
    timestamp: datetime

class TrainingRequest(BaseModel):
    """Request model for model training"""
    experiment_name: str = "default_experiment"
    test_size: float = 0.2
    random_state: int = 42
    n_estimators: int = 100

class ModelInfo(BaseModel):
    """Model information response"""
    model_name: str
    version: str
    accuracy: Optional[float]
    created_at: datetime
    features_count: int

# Utility functions
def generate_sample_data(n_samples: int = 1000) -> pd.DataFrame:
    """Generate sample dataset for demonstration"""
    np.random.seed(42)
    
    # TODO: Replace with your actual data loading logic
    data = {
        'feature_1': np.random.normal(0, 1, n_samples),
        'feature_2': np.random.normal(0, 1, n_samples),
        'feature_3': np.random.normal(0, 1, n_samples),
        'feature_4': np.random.normal(0, 1, n_samples),
    }
    
    df = pd.DataFrame(data)
    
    # Create target variable (binary classification)
    df['target'] = (df['feature_1'] + df['feature_2'] > 0).astype(int)
    
    return df

def save_model(model, model_name: str = "ml_model") -> str:
    """Save model using joblib"""
    model_path = f"/home/user/models/{model_name}.joblib"
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)
    logger.info("Model saved", model_path=model_path)
    return model_path

def load_model(model_path: str = "/home/user/models/ml_model.joblib"):
    """Load model using joblib"""
    try:
        model = joblib.load(model_path)
        logger.info("Model loaded successfully", model_path=model_path)
        return model
    except FileNotFoundError:
        logger.warning("Model file not found", model_path=model_path)
        return None

# API Endpoints

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": current_model is not None,
        "service": "MLOps FastAPI Template"
    }

@app.get("/")
async def root():
    """Root endpoint with service information"""
    return {
        "message": "🤖 MLOps FastAPI Template",
        "description": "Production-ready ML model deployment with monitoring",
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "train": "/train",
            "predict": "/predict", 
            "model_info": "/model/info",
            "drift_report": "/monitoring/drift"
        }
    }

@app.post("/train")
async def train_model(
    request: TrainingRequest,
    background_tasks: BackgroundTasks
):
    """Train a new model with experiment tracking"""
    try:
        logger.info("Starting model training", experiment=request.experiment_name)
        
        # Set MLflow experiment
        mlflow.set_experiment(request.experiment_name)
        
        with mlflow.start_run():
            # Generate or load training data
            # TODO: Replace with your actual data loading logic
            data = generate_sample_data(1000)
            
            X = data.drop('target', axis=1)
            y = data['target']
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=request.test_size, random_state=request.random_state
            )
            
            # Train model
            model = RandomForestClassifier(
                n_estimators=request.n_estimators,
                random_state=request.random_state
            )
            model.fit(X_train, y_train)
            
            # Evaluate model
            y_pred = model.predict(X_test)
            accuracy = accuracy_score(y_test, y_pred)
            
            # Log parameters and metrics to MLflow
            mlflow.log_param("n_estimators", request.n_estimators)
            mlflow.log_param("test_size", request.test_size)
            mlflow.log_param("random_state", request.random_state)
            mlflow.log_metric("accuracy", accuracy)
            
            # Log model
            mlflow.sklearn.log_model(model, "model")
            
            # Save model locally
            model_path = save_model(model, f"model_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
            
            # Update global model
            global current_model, reference_data, model_metrics
            current_model = model
            reference_data = X_train  # Store for drift detection
            model_metrics = {
                "accuracy": accuracy,
                "trained_at": datetime.now(),
                "features": list(X.columns),
                "model_path": model_path
            }
            
            logger.info("Model training completed", 
                       accuracy=accuracy, 
                       model_path=model_path)
            
            return {
                "message": "Model trained successfully",
                "accuracy": accuracy,
                "model_path": model_path,
                "experiment_name": request.experiment_name,
                "mlflow_run_id": mlflow.active_run().info.run_id
            }
            
    except Exception as e:
        logger.error("Training failed", error=str(e))
        raise HTTPException(status_code=500, detail=f"Training failed: {str(e)}")

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Make predictions using the current model"""
    global current_model, model_metrics
    
    if current_model is None:
        raise HTTPException(
            status_code=400, 
            detail="No model available. Please train a model first."
        )
    
    try:
        # Prepare features for prediction
        features_array = np.array(request.features).reshape(1, -1)
        
        # Make prediction
        prediction = current_model.predict(features_array)[0]
        
        # Get prediction confidence (probability)
        if hasattr(current_model, 'predict_proba'):
            confidence = float(max(current_model.predict_proba(features_array)[0]))
        else:
            confidence = 1.0  # Default confidence for models without probability
        
        logger.info("Prediction made", 
                   prediction=int(prediction), 
                   confidence=confidence)
        
        return PredictionResponse(
            prediction=int(prediction),
            confidence=confidence,
            model_version=request.model_version,
            timestamp=datetime.now()
        )
        
    except Exception as e:
        logger.error("Prediction failed", error=str(e))
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/model/info", response_model=ModelInfo)
async def get_model_info():
    """Get information about the current model"""
    global current_model, model_metrics
    
    if current_model is None:
        raise HTTPException(status_code=400, detail="No model available")
    
    return ModelInfo(
        model_name="RandomForestClassifier",  # TODO: Make dynamic
        version="1.0.0",
        accuracy=model_metrics.get("accuracy"),
        created_at=model_metrics.get("trained_at", datetime.now()),
        features_count=len(model_metrics.get("features", []))
    )

@app.get("/monitoring/drift")
async def get_drift_report():
    """Generate data drift report using Evidently"""
    global reference_data, current_model
    
    if reference_data is None:
        raise HTTPException(
            status_code=400, 
            detail="No reference data available. Train a model first."
        )
    
    try:
        # TODO: Replace with actual current data
        # For demo, we'll use slightly modified reference data
        current_data = reference_data.copy()
        current_data += np.random.normal(0, 0.1, current_data.shape)  # Add some drift
        
        # Create Evidently report
        report = Report(metrics=[DataDriftSuite()])
        
        report.run(
            reference_data=reference_data, 
            current_data=current_data
        )
        
        # Convert report to JSON
        report_json = report.json()
        
        logger.info("Drift report generated")
        
        return {
            "message": "Drift report generated successfully",
            "timestamp": datetime.now().isoformat(),
            "report": report_json
        }
        
    except Exception as e:
        logger.error("Drift report generation failed", error=str(e))
        raise HTTPException(status_code=500, detail=f"Drift report failed: {str(e)}")

@app.get("/metrics")
async def get_metrics():
    """Prometheus-compatible metrics endpoint"""
    # TODO: Implement Prometheus metrics
    return {
        "predictions_total": 0,  # TODO: Track actual metrics
        "model_accuracy": model_metrics.get("accuracy", 0),
        "uptime_seconds": 0,  # TODO: Track uptime
        "errors_total": 0  # TODO: Track errors
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize the application"""
    logger.info("🤖 MLOps FastAPI Template starting up")
    
    # Create necessary directories
    os.makedirs("/home/user/models", exist_ok=True)
    os.makedirs("/home/user/data", exist_ok=True)
    
    # Try to load existing model
    global current_model
    current_model = load_model()
    
    # Set up MLflow tracking
    # TODO: Configure remote MLflow server if needed
    mlflow.set_tracking_uri("file:///home/user/mlruns")
    
    logger.info("Application initialized successfully")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Clean up on application shutdown"""
    logger.info("🤖 MLOps FastAPI Template shutting down")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8080,
        reload=True,
        log_config=None  # Use structlog instead
    )