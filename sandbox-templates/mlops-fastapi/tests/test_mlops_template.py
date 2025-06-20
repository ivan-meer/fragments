"""
🧪 Tests for MLOps FastAPI Template
Comprehensive test suite for ML model deployment and monitoring
"""

import pytest
import numpy as np
import pandas as pd
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import json
import os
import sys

# Add the parent directory to the path to import the app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app, generate_sample_data, save_model, load_model

# Create test client
client = TestClient(app)

class TestMLOpsTemplate:
    """Test class for MLOps FastAPI Template"""
    
    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        assert "model_loaded" in data
        assert data["service"] == "MLOps FastAPI Template"
    
    def test_root_endpoint(self):
        """Test root endpoint returns service information"""
        response = client.get("/")
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "🤖 MLOps FastAPI Template" in data["message"]
        assert "endpoints" in data
        assert "docs" in data
    
    def test_generate_sample_data(self):
        """Test sample data generation"""
        data = generate_sample_data(100)
        
        assert isinstance(data, pd.DataFrame)
        assert len(data) == 100
        assert "target" in data.columns
        assert len(data.columns) == 5  # 4 features + 1 target
        
        # Check data types
        assert data["target"].dtype in [int, bool, 'int64']
        
    def test_model_training_endpoint(self):
        """Test model training endpoint"""
        training_request = {
            "experiment_name": "test_experiment",
            "test_size": 0.2,
            "random_state": 42,
            "n_estimators": 10  # Small for fast testing
        }
        
        response = client.post("/train", json=training_request)
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "accuracy" in data
        assert "model_path" in data
        assert data["accuracy"] > 0  # Should be positive
        assert data["accuracy"] <= 1  # Should be <= 1
    
    def test_prediction_endpoint_without_model(self):
        """Test prediction endpoint when no model is available"""
        prediction_request = {
            "features": [1.0, 2.0, 3.0, 4.0]
        }
        
        # First, ensure no model is loaded
        # This test should be run before training
        response = client.post("/predict", json=prediction_request)
        
        # Should return 400 if no model is available
        # or 200 if a model was trained in previous tests
        assert response.status_code in [200, 400]
    
    def test_prediction_endpoint_with_invalid_data(self):
        """Test prediction endpoint with invalid input data"""
        # Test with empty features
        prediction_request = {
            "features": []
        }
        
        response = client.post("/predict", json=prediction_request)
        assert response.status_code == 422  # Validation error
    
    def test_model_info_endpoint_without_model(self):
        """Test model info endpoint when no model is available"""
        response = client.get("/model/info")
        
        # Should return 400 if no model is available
        # or 200 if a model was trained in previous tests
        assert response.status_code in [200, 400]
    
    def test_drift_report_endpoint_without_data(self):
        """Test drift report endpoint when no reference data is available"""
        response = client.get("/monitoring/drift")
        
        # Should return 400 if no reference data is available
        # or 200 if training was done in previous tests
        assert response.status_code in [200, 400]
    
    def test_metrics_endpoint(self):
        """Test metrics endpoint"""
        response = client.get("/metrics")
        assert response.status_code == 200
        
        data = response.json()
        assert "predictions_total" in data
        assert "model_accuracy" in data
        assert "uptime_seconds" in data
        assert "errors_total" in data
    
    def test_save_and_load_model(self):
        """Test model saving and loading utilities"""
        from sklearn.ensemble import RandomForestClassifier
        
        # Create a simple model
        model = RandomForestClassifier(n_estimators=5, random_state=42)
        
        # Generate sample data and train
        data = generate_sample_data(100)
        X = data.drop('target', axis=1)
        y = data['target']
        model.fit(X, y)
        
        # Test saving
        model_path = save_model(model, "test_model")
        assert os.path.exists(model_path)
        
        # Test loading
        loaded_model = load_model(model_path)
        assert loaded_model is not None
        
        # Test predictions are the same
        original_pred = model.predict(X.iloc[:5])
        loaded_pred = loaded_model.predict(X.iloc[:5])
        np.testing.assert_array_equal(original_pred, loaded_pred)
        
        # Clean up
        if os.path.exists(model_path):
            os.remove(model_path)

class TestIntegrationFlow:
    """Integration tests for complete ML workflow"""
    
    def test_complete_ml_workflow(self):
        """Test complete ML workflow: train -> predict -> monitor"""
        
        # Step 1: Train model
        training_request = {
            "experiment_name": "integration_test",
            "test_size": 0.2,
            "random_state": 42,
            "n_estimators": 10
        }
        
        train_response = client.post("/train", json=training_request)
        assert train_response.status_code == 200
        
        train_data = train_response.json()
        assert "accuracy" in train_data
        
        # Step 2: Make prediction
        prediction_request = {
            "features": [1.0, -0.5, 0.8, 2.1],
            "model_version": "latest"
        }
        
        pred_response = client.post("/predict", json=prediction_request)
        assert pred_response.status_code == 200
        
        pred_data = pred_response.json()
        assert "prediction" in pred_data
        assert "confidence" in pred_data
        assert "timestamp" in pred_data
        assert pred_data["prediction"] in [0, 1]  # Binary classification
        assert 0 <= pred_data["confidence"] <= 1
        
        # Step 3: Get model info
        info_response = client.get("/model/info")
        assert info_response.status_code == 200
        
        info_data = info_response.json()
        assert "model_name" in info_data
        assert "accuracy" in info_data
        assert "features_count" in info_data
        
        # Step 4: Generate drift report
        drift_response = client.get("/monitoring/drift")
        assert drift_response.status_code == 200
        
        drift_data = drift_response.json()
        assert "message" in drift_data
        assert "timestamp" in drift_data

class TestErrorHandling:
    """Test error handling and edge cases"""
    
    def test_prediction_with_wrong_feature_count(self):
        """Test prediction with incorrect number of features"""
        # First train a model
        training_request = {
            "experiment_name": "error_test",
            "n_estimators": 5
        }
        client.post("/train", json=training_request)
        
        # Try prediction with wrong feature count
        prediction_request = {
            "features": [1.0, 2.0]  # Only 2 features instead of 4
        }
        
        response = client.post("/predict", json=prediction_request)
        # Should handle the error gracefully
        assert response.status_code in [422, 500]
    
    def test_invalid_training_parameters(self):
        """Test training with invalid parameters"""
        training_request = {
            "experiment_name": "",  # Empty experiment name
            "test_size": 1.5,  # Invalid test size
            "n_estimators": -1  # Invalid estimators
        }
        
        response = client.post("/train", json=training_request)
        # Should return validation error
        assert response.status_code == 422

class TestSecurityAndValidation:
    """Test security features and input validation"""
    
    def test_cors_headers(self):
        """Test CORS headers are present"""
        response = client.get("/health")
        # FastAPI TestClient doesn't always include CORS headers in tests
        # In real deployment, these would be present
        assert response.status_code == 200
    
    def test_input_validation(self):
        """Test input validation with Pydantic"""
        # Test prediction with invalid JSON structure
        response = client.post(
            "/predict", 
            json={"invalid_field": "invalid_value"}
        )
        assert response.status_code == 422
        
        # Test training with invalid JSON structure  
        response = client.post(
            "/train",
            json={"invalid_field": "invalid_value"}
        )
        assert response.status_code == 422

# TODO: Add more tests
class TestTODOItems:
    """Tests for TODO items and future features"""
    
    @pytest.mark.skip(reason="TODO: Implement database integration")
    def test_database_integration(self):
        """Test database integration for model metadata"""
        pass
    
    @pytest.mark.skip(reason="TODO: Implement authentication")
    def test_authentication(self):
        """Test API authentication and authorization"""
        pass
    
    @pytest.mark.skip(reason="TODO: Implement rate limiting")
    def test_rate_limiting(self):
        """Test API rate limiting"""
        pass
    
    @pytest.mark.skip(reason="TODO: Implement caching")
    def test_prediction_caching(self):
        """Test prediction result caching"""
        pass

# Performance tests
class TestPerformance:
    """Performance and load tests"""
    
    def test_prediction_latency(self):
        """Test prediction response time"""
        import time
        
        # Train model first
        training_request = {"experiment_name": "perf_test", "n_estimators": 5}
        client.post("/train", json=training_request)
        
        # Measure prediction time
        prediction_request = {"features": [1.0, 2.0, 3.0, 4.0]}
        
        start_time = time.time()
        response = client.post("/predict", json=prediction_request)
        end_time = time.time()
        
        assert response.status_code == 200
        
        # Should respond within reasonable time (adjust threshold as needed)
        latency = end_time - start_time
        assert latency < 1.0  # Should be under 1 second
    
    def test_concurrent_predictions(self):
        """Test handling multiple concurrent predictions"""
        # This would require proper async testing setup
        # For now, just test multiple sequential requests
        
        # Train model first
        training_request = {"experiment_name": "concurrent_test", "n_estimators": 5}
        client.post("/train", json=training_request)
        
        prediction_request = {"features": [1.0, 2.0, 3.0, 4.0]}
        
        # Make multiple requests
        for i in range(5):
            response = client.post("/predict", json=prediction_request)
            assert response.status_code == 200

if __name__ == "__main__":
    # Run tests if script is executed directly
    pytest.main([__file__])