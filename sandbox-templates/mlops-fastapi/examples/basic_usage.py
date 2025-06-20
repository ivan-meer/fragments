"""
🤖 MLOps FastAPI Template - Basic Usage Examples
Demonstrates core functionality and common use cases
"""

import requests
import json
import time
from typing import Dict, Any

# Configuration
BASE_URL = "http://localhost:8080"

def make_request(method: str, endpoint: str, data: Dict = None) -> Dict[Any, Any]:
    """Helper function to make API requests with error handling"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method.upper() == "GET":
            response = requests.get(url)
        elif method.upper() == "POST":
            response = requests.post(url, json=data)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        response.raise_for_status()
        return response.json()
    
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response: {e.response.text}")
        return {}

def check_service_health():
    """Check if the MLOps service is running"""
    print("🔍 Checking service health...")
    result = make_request("GET", "/health")
    
    if result:
        print(f"✅ Service is healthy: {result['status']}")
        print(f"   Model loaded: {result['model_loaded']}")
        print(f"   Timestamp: {result['timestamp']}")
        return True
    else:
        print("❌ Service is not available")
        return False

def get_service_info():
    """Get service information and available endpoints"""
    print("\n📋 Getting service information...")
    result = make_request("GET", "/")
    
    if result:
        print(f"✅ {result['message']}")
        print("   Available endpoints:")
        for endpoint, description in result.get('endpoints', {}).items():
            print(f"   - {endpoint}: {description}")

def train_model(experiment_name: str = "basic_example"):
    """Train a machine learning model"""
    print(f"\n🚀 Training model for experiment: {experiment_name}")
    
    training_config = {
        "experiment_name": experiment_name,
        "test_size": 0.2,
        "random_state": 42,
        "n_estimators": 50  # Reasonable size for demo
    }
    
    print(f"   Configuration: {json.dumps(training_config, indent=2)}")
    
    start_time = time.time()
    result = make_request("POST", "/train", training_config)
    end_time = time.time()
    
    if result:
        print(f"✅ Model trained successfully!")
        print(f"   Accuracy: {result['accuracy']:.4f}")
        print(f"   Training time: {end_time - start_time:.2f} seconds")
        print(f"   Model path: {result['model_path']}")
        print(f"   MLflow run ID: {result.get('mlflow_run_id', 'N/A')}")
        return True
    else:
        print("❌ Model training failed")
        return False

def make_predictions():
    """Make predictions using the trained model"""
    print("\n🔮 Making predictions...")
    
    # Example prediction requests
    test_cases = [
        {
            "name": "Positive case",
            "features": [1.5, 2.0, -0.5, 1.2]
        },
        {
            "name": "Negative case", 
            "features": [-1.0, -0.8, -1.2, -0.3]
        },
        {
            "name": "Edge case",
            "features": [0.0, 0.0, 0.0, 0.0]
        }
    ]
    
    predictions = []
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n   Test case {i}: {test_case['name']}")
        print(f"   Features: {test_case['features']}")
        
        prediction_request = {
            "features": test_case["features"],
            "model_version": "latest"
        }
        
        result = make_request("POST", "/predict", prediction_request)
        
        if result:
            print(f"   ✅ Prediction: {result['prediction']}")
            print(f"   Confidence: {result['confidence']:.4f}")
            print(f"   Timestamp: {result['timestamp']}")
            predictions.append(result)
        else:
            print(f"   ❌ Prediction failed")
    
    return predictions

def get_model_info():
    """Get information about the current model"""
    print("\n📊 Getting model information...")
    
    result = make_request("GET", "/model/info")
    
    if result:
        print(f"✅ Model information:")
        print(f"   Name: {result['model_name']}")
        print(f"   Version: {result['version']}")
        print(f"   Accuracy: {result.get('accuracy', 'N/A')}")
        print(f"   Created: {result['created_at']}")
        print(f"   Features: {result['features_count']}")
        return result
    else:
        print("❌ Failed to get model information")
        return None

def generate_drift_report():
    """Generate a data drift monitoring report"""
    print("\n📈 Generating drift report...")
    
    result = make_request("GET", "/monitoring/drift")
    
    if result:
        print(f"✅ Drift report generated successfully")
        print(f"   Timestamp: {result['timestamp']}")
        
        # The report is quite large, so we'll just show a summary
        report_data = result.get('report')
        if report_data:
            print("   📋 Report summary available (full report in response)")
        
        return result
    else:
        print("❌ Failed to generate drift report")
        return None

def get_metrics():
    """Get service metrics"""
    print("\n📊 Getting service metrics...")
    
    result = make_request("GET", "/metrics")
    
    if result:
        print(f"✅ Service metrics:")
        for metric, value in result.items():
            print(f"   {metric}: {value}")
        return result
    else:
        print("❌ Failed to get metrics")
        return None

def run_basic_workflow():
    """Run a complete basic workflow"""
    print("🤖 MLOps FastAPI Template - Basic Usage Example")
    print("=" * 60)
    
    # Step 1: Check service health
    if not check_service_health():
        print("❌ Service is not available. Please start the service first.")
        return
    
    # Step 2: Get service info
    get_service_info()
    
    # Step 3: Train a model
    if not train_model("basic_workflow_demo"):
        print("❌ Cannot continue without a trained model")
        return
    
    # Step 4: Get model information
    model_info = get_model_info()
    
    # Step 5: Make predictions
    predictions = make_predictions()
    
    # Step 6: Generate drift report
    drift_report = generate_drift_report()
    
    # Step 7: Get metrics
    metrics = get_metrics()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 Workflow Summary:")
    print(f"   ✅ Service health: OK")
    print(f"   ✅ Model trained: {model_info is not None}")
    print(f"   ✅ Predictions made: {len(predictions)}")
    print(f"   ✅ Drift report: {drift_report is not None}")
    print(f"   ✅ Metrics collected: {metrics is not None}")
    print("\n🎉 Basic workflow completed successfully!")

def run_advanced_examples():
    """Run advanced usage examples"""
    print("\n🚀 Advanced Usage Examples")
    print("=" * 40)
    
    # Example 1: Multiple model training with different parameters
    print("\n1. Training multiple models with different parameters:")
    
    model_configs = [
        {"experiment_name": "model_small", "n_estimators": 10},
        {"experiment_name": "model_medium", "n_estimators": 50},
        {"experiment_name": "model_large", "n_estimators": 100}
    ]
    
    results = []
    for config in model_configs:
        print(f"\n   Training {config['experiment_name']}...")
        result = make_request("POST", "/train", config)
        if result:
            results.append({
                "name": config["experiment_name"],
                "accuracy": result["accuracy"],
                "n_estimators": config["n_estimators"]
            })
    
    # Compare results
    if results:
        print("\n   📊 Model comparison:")
        for result in sorted(results, key=lambda x: x["accuracy"], reverse=True):
            print(f"   {result['name']}: {result['accuracy']:.4f} (n_estimators={result['n_estimators']})")
    
    # Example 2: Batch predictions
    print("\n2. Batch predictions:")
    
    batch_features = [
        [1.0, 2.0, 3.0, 4.0],
        [-1.0, -2.0, -3.0, -4.0],
        [0.5, -0.5, 1.0, -1.0],
        [2.0, 1.0, -1.0, 0.5]
    ]
    
    batch_results = []
    for i, features in enumerate(batch_features):
        result = make_request("POST", "/predict", {"features": features})
        if result:
            batch_results.append({
                "id": i+1,
                "features": features,
                "prediction": result["prediction"],
                "confidence": result["confidence"]
            })
    
    if batch_results:
        print("   📋 Batch prediction results:")
        for result in batch_results:
            print(f"   Sample {result['id']}: prediction={result['prediction']}, confidence={result['confidence']:.4f}")

def error_handling_examples():
    """Demonstrate error handling"""
    print("\n⚠️  Error Handling Examples")
    print("=" * 40)
    
    # Example 1: Prediction without model (if applicable)
    print("\n1. Testing error scenarios:")
    
    # Try prediction with wrong number of features
    print("   - Wrong feature count:")
    result = make_request("POST", "/predict", {"features": [1.0, 2.0]})  # Only 2 features
    
    # Try invalid training parameters
    print("   - Invalid training parameters:")
    result = make_request("POST", "/train", {
        "experiment_name": "",
        "n_estimators": -1,
        "test_size": 1.5
    })
    
    # Try accessing non-existent endpoint
    print("   - Non-existent endpoint:")
    result = make_request("GET", "/non-existent")

def performance_testing():
    """Basic performance testing"""
    print("\n⚡ Performance Testing")
    print("=" * 30)
    
    # Train a model first
    train_model("performance_test")
    
    # Test prediction latency
    print("\n1. Prediction latency test:")
    test_features = [1.0, 2.0, 3.0, 4.0]
    
    latencies = []
    num_requests = 10
    
    for i in range(num_requests):
        start_time = time.time()
        result = make_request("POST", "/predict", {"features": test_features})
        end_time = time.time()
        
        if result:
            latency = (end_time - start_time) * 1000  # Convert to milliseconds
            latencies.append(latency)
    
    if latencies:
        avg_latency = sum(latencies) / len(latencies)
        min_latency = min(latencies)
        max_latency = max(latencies)
        
        print(f"   📊 Latency statistics ({num_requests} requests):")
        print(f"   Average: {avg_latency:.2f}ms")
        print(f"   Min: {min_latency:.2f}ms")
        print(f"   Max: {max_latency:.2f}ms")

if __name__ == "__main__":
    try:
        # Run the basic workflow
        run_basic_workflow()
        
        # Run advanced examples
        run_advanced_examples()
        
        # Demonstrate error handling
        error_handling_examples()
        
        # Basic performance testing
        performance_testing()
        
        print("\n🎉 All examples completed!")
        
    except KeyboardInterrupt:
        print("\n👋 Examples interrupted by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()