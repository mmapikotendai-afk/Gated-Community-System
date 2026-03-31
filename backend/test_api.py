import requests
import json

BASE_URL = "http://localhost:8000"

def test_create_resident():
    print("Testing Create Resident...")
    data = {
        "name": "Test Resident",
        "unit_number": "A101",
        "contact_number": "1234567890",
        "email": "test@example.com"
    }
    try:
        response = requests.post(f"{BASE_URL}/residents/", json=data)
        if response.status_code == 200:
            print("Success:", response.json())
            return response.json()['id']
        else:
            print("Failed:", response.status_code, response.text)
            return None
    except Exception as e:
        print("Error:", e)
        return None

def test_get_residents():
    print("\nTesting Get Residents...")
    try:
        response = requests.get(f"{BASE_URL}/residents/")
        if response.status_code == 200:
            residents = response.json()
            print(f"Found {len(residents)} residents")
            print(residents)
        else:
            print("Failed:", response.status_code, response.text)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    resident_id = test_create_resident()
    if resident_id:
        test_get_residents()
