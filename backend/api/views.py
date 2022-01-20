from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd


class calculationResult(APIView):
    

    def post(self, request, format=None):
        data = request.data
        keys = []
        values = []
        for key in data:
            keys.append(key)
            values.append(data[key])
        