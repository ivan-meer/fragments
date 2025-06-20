# 🤖 MLOps FastAPI Template

Production-ready ML model deployment with monitoring, experiment tracking, and data validation.

## ✨ Features

- 🚀 **FastAPI-based ML model serving** with automatic API documentation
- 📊 **MLflow integration** for experiment tracking and model versioning
- 📈 **Evidently monitoring** for data drift detection
- 🔍 **Structured logging** with security-aware data sanitization
- 🐳 **Docker containerization** with non-root user security
- 📋 **Health checks** and monitoring endpoints
- 🧪 **Built-in testing** framework with pytest

## 🛠️ Tech Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **MLflow** - Open source platform for machine learning lifecycle
- **Evidently** - ML monitoring and data drift detection
- **Scikit-learn** - Machine learning library for model training
- **Pandas & NumPy** - Data manipulation and numerical computing
- **Structlog** - Structured logging for better observability
- **Uvicorn** - Lightning-fast ASGI server
- **Pytest** - Testing framework

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- E2B sandbox environment

### Basic Usage

1. **Train a model:**
```bash
curl -X POST "http://localhost:8080/train" \
  -H "Content-Type: application/json" \
  -d '{
    "experiment_name": "my_experiment",
    "n_estimators": 100,
    "test_size": 0.2
  }'
```

2. **Make predictions:**
```bash
curl -X POST "http://localhost:8080/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "features": [1.2, -0.5, 0.8, 2.1],
    "model_version": "latest"
  }'
```

3. **Check model info:**
```bash
curl "http://localhost:8080/model/info"
```

4. **Monitor data drift:**
```bash
curl "http://localhost:8080/monitoring/drift"
```

## 📊 API Endpoints

### Core Endpoints
- `GET /` - Service information and available endpoints
- `GET /health` - Health check for monitoring
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

### ML Operations
- `POST /train` - Train a new model with experiment tracking
- `POST /predict` - Make predictions using the current model
- `GET /model/info` - Get current model information
- `GET /monitoring/drift` - Generate data drift report
- `GET /metrics` - Prometheus-compatible metrics

## 🔧 Configuration

### Environment Variables
```bash
# MLflow configuration
MLFLOW_TRACKING_URI=file:///home/user/mlruns

# Logging level
LOG_LEVEL=INFO

# TODO: Add database configuration
# DATABASE_URL=postgresql://user:pass@localhost/db
```

### Model Configuration
Modify the training parameters in the training request:

```json
{
  "experiment_name": "production_model",
  "test_size": 0.2,
  "random_state": 42,
  "n_estimators": 100
}
```

## 📈 Monitoring & Observability

### Structured Logging
All operations are logged with structured JSON format:

```json
{
  "timestamp": "2024-06-20T10:30:00Z",
  "level": "info",
  "event": "Model training completed",
  "accuracy": 0.95,
  "model_path": "/home/user/models/model_20240620_103000.joblib"
}
```

### Health Monitoring
The `/health` endpoint provides comprehensive service status:

```json
{
  "status": "healthy",
  "timestamp": "2024-06-20T10:30:00Z",
  "model_loaded": true,
  "service": "MLOps FastAPI Template"
}
```

### Data Drift Detection
Monitor model performance and data quality:

```bash
# Generate drift report
curl "http://localhost:8080/monitoring/drift"
```

## 🧪 Testing

Run the test suite:

```bash
# Install test dependencies
pip install -r requirements.txt

# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=app --cov-report=html
```

## 🔐 Security Features

- **Non-root container execution** for enhanced security
- **Input validation** with Pydantic models
- **Structured logging** with sensitive data sanitization
- **CORS configuration** (restrict in production)
- **Health checks** for container orchestration

## 📚 Use Cases

### 1. Model Deployment
Deploy trained ML models as REST APIs with automatic documentation.

### 2. A/B Testing
Track multiple model versions and compare performance metrics.

### 3. Data Pipeline Integration
Integrate with data pipelines for real-time model inference.

### 4. Model Monitoring
Monitor model performance and detect data drift in production.

### 5. Experiment Tracking
Track experiments, parameters, and metrics with MLflow.

## 🔄 Development Workflow

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app:app --host 0.0.0.0 --port 8080 --reload

# Access API documentation
open http://localhost:8080/docs
```

### Adding New Models
1. Extend the training endpoint with new model types
2. Update the prediction logic for model-specific inference
3. Add model-specific metrics and monitoring
4. Update the API documentation

### Custom Data Sources
Replace the `generate_sample_data()` function with your data loading logic:

```python
def load_your_data() -> pd.DataFrame:
    # TODO: Implement your data loading logic
    # Examples:
    # - Load from database
    # - Read from CSV/Parquet files
    # - Fetch from API
    # - Stream from Kafka
    pass
```

## 🚧 TODO Items

- [ ] Add database integration for model metadata
- [ ] Implement model versioning with automatic rollback
- [ ] Add batch prediction endpoints
- [ ] Integrate with cloud storage (S3, GCS, Azure Blob)
- [ ] Add authentication and authorization
- [ ] Implement rate limiting
- [ ] Add caching layer for predictions
- [ ] Create model performance dashboard
- [ ] Add support for deep learning models (TensorFlow, PyTorch)
- [ ] Implement model explainability features

## 📖 Advanced Examples

Check the `examples/` directory for:
- Custom model implementations
- Advanced monitoring setups
- Integration with different data sources
- Production deployment configurations

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using port 8080
   lsof -i :8080
   ```

2. **Model training fails**
   - Check data format and features
   - Verify sufficient memory allocation
   - Review logs in `/home/user/logs/`

3. **Predictions return errors**
   - Ensure model is trained first
   - Verify feature count matches training data
   - Check input data format

### Performance Optimization

1. **Increase worker processes**
   ```bash
   uvicorn app:app --workers 4
   ```

2. **Enable model caching**
   - Implement Redis for model caching
   - Use memory-mapped model loading

3. **Database optimization**
   - Use connection pooling
   - Implement async database operations

## 📞 Support

For issues and questions:
- Check the [troubleshooting guide](#-troubleshooting)
- Review API documentation at `/docs`
- Check application logs for detailed error information

---

**Created with E2B Fragments** 🤖  
**Last Updated**: June 2024