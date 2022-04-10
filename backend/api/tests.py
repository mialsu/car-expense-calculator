from rest_framework.test import APIRequestFactory

from backend.api.views import CalculationResult

def test_post(self):
    # Test simple post request
    factory = APIRequestFactory()
    test_request = {
        "vehicle-type": "henkiloauto",
        "year-registered": "2006",
        "mass": "2050",
        "motor-power": "diesel",
        "consumption": "5.8",
        "emissions": "158",
        "yearly-kilometers": "15000",
        "fuel-price": "2.193",
        "yearly-insurance": "332.68"
        }
    view = CalculationResult.as_view()
    request = factory.post('calculate',test_request)
    response = self.view(request)
    response.render()
    self.assertEqual(response.content, {"yearly": 2880.44, "monthly": 240.04})
