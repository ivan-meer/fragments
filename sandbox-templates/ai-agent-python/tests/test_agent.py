import pytest
from fastapi.testclient import TestClient
from agent import app
from unittest.mock import patch

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@patch('agent.OpenAI')
def test_chat_endpoint(mock_openai):
    mock_openai.return_value = "Formatted response\nwith code examples"
    test_message = {"message": "Hello"}
    
    response = client.post("/chat", json=test_message)
    assert response.status_code == 200
    response_data = response.json()
    assert "response" in response_data
    assert "code" in response_data["response"].lower()

@patch('agent.OpenAI')
def test_multilingual_support(mock_openai):
    mock_openai.return_value = "Ответ на русском"
    response = client.post("/chat", json={"message": "Привет"})
    assert "русск" in response.json()["response"].lower()

def test_error_handling_with_details():
    with patch('agent.conversation.predict', side_effect=Exception("Test error")):
        response = client.post("/chat", json={"message": "error"})
        assert response.status_code == 500
        assert "type" in response.json()

def test_error_handling():
    with patch('agent.conversation.predict', side_effect=Exception("Test error")):
        response = client.post("/chat", json={"message": "error"})
        assert response.status_code == 500
        assert "error" in response.json()