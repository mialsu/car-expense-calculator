from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
import math

from api.models import TaxClass


class CalculationResult(APIView):

    model = TaxClass

    def post(self, request, format=None):

        #Simple function to round mass
        def roundMassUp(x):
            return int(math.ceil(x / 100.0)) * 100


        data = request.data

        vehicle_type = data['vehicle-type']
        year_registered = int(data['year-registered'])
        mass = int(data['mass'])
        motor_power = data['motor-power']
        consumption = float(data['consumption'])
        yearly_kilometers = int(data['yearly-kilometers'])
        fuel_price = float(data['fuel-price'])
        yearly_insurance = float(data['yearly-insurance'])

        # Check request parameters with if statements
        if vehicle_type == 'henkiloauto':
            if mass <= 2500:
                if year_registered >= 2001:
                    if motor_power == 'gasoline':
                        if year_registered >= 2020:
                            yearly_tax = TaxClass.objects.filter(
                                tax_norm='wltp', tax_class=data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                        else:
                            yearly_tax = TaxClass.objects.filter(
                                tax_norm='nedc', tax_class=data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                    elif motor_power == 'diesel':
                        if year_registered >= 2020:
                            yearly_tax = TaxClass.objects.filter(
                                tax_norm='wltp', tax_class=data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                            yearly_tax = yearly_tax + \
                                (roundMassUp(mass)/100)*0.055*365
                        else:
                            yearly_tax = TaxClass.objects.filter(
                                tax_norm='nedc', tax_class=data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                            yearly_tax = yearly_tax + \
                                (roundMassUp(mass)/100)*0.055*365
                elif year_registered < 2001:
                    if motor_power == 'gasoline':
                        yearly_tax = TaxClass.objects.filter(
                            tax_norm='mass', tax_class=str(roundMassUp(mass))).values('yearly_tax')
                        yearly_tax = yearly_tax[0]['yearly_tax']
                    elif motor_power == 'diesel':
                        yearly_tax = TaxClass.objects.filter(
                            tax_norm='mass', tax_class=str(roundMassUp(mass))).values('yearly_tax')
                        print(yearly_tax)
                        yearly_tax = yearly_tax[0]['yearly_tax']
                        yearly_tax = yearly_tax + \
                            (roundMassUp(mass)/100)*0.055*365
            elif mass > 2500:
                if year_registered >= 2002:
                    if motor_power == 'gasoline':
                        if year_registered >= 2020:
                            yearly_tax = TaxClass.objects.filter(
                                tax_norm='wltp', tax_class=data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                        elif year_registered < 2020:
                            yearly_tax = TaxClass.objects.filter(
                                tax_norm='nedc', tax_class=data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                    elif motor_power == 'diesel':
                        if year_registered >= 2020:
                            yearly_tax = TaxClass.objects.filter(
                                tax_norm='wltp', tax_class=data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                            yearly_tax = yearly_tax + \
                                (roundMassUp(mass)/100)*0.055*365
                        else:
                            yearly_tax = TaxClass.objects.filter(
                                tax_norm='nedc', tax_class=data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                            yearly_tax = yearly_tax + \
                                (roundMassUp(mass)/100)*0.055*365
                elif year_registered < 2002:
                    if motor_power == 'gasoline':
                        yearly_tax = TaxClass.objects.filter(
                            tax_norm='mass', tax_class=str(roundMassUp(mass))).values('yearly_tax')
                        yearly_tax = yearly_tax[0]['yearly_tax']
                    elif motor_power == 'diesel':
                        yearly_tax = TaxClass.objects.filter(
                            tax_norm='mass', tax_class=str(roundMassUp(mass))).values('yearly_tax')
                        yearly_tax = yearly_tax[0]['yearly_tax']
                        yearly_tax = yearly_tax + \
                            (roundMassUp(mass)/100)*0.055*365

        elif vehicle_type == 'pakettiauto':
            if year_registered >= 2008:
                if motor_power == 'gasoline':
                    if year_registered >= 2020:
                        yearly_tax = TaxClass.objects.filter(
                            tax_norm='wltp', tax_class=data['emissions']).values('yearly_tax')
                        yearly_tax = yearly_tax[0]['yearly_tax']
                    else:
                        yearly_tax = TaxClass.objects.filter(
                            tax_norm='nedc', tax_class=data['emissions']).values('yearly_tax')
                        yearly_tax = yearly_tax[0]['yearly_tax']
                elif motor_power == 'diesel':
                    if year_registered >= 2020:
                        yearly_tax = TaxClass.objects.filter(
                            tax_norm='wltp', tax_class=data['emissions']).values('yearly_tax')
                        yearly_tax = yearly_tax[0]['yearly_tax']
                        yearly_tax = yearly_tax + \
                            (roundMassUp(mass)/100)*0.009*365
                    else:
                        yearly_tax = TaxClass.objects.filter(
                            tax_norm='nedc', tax_class=data['emissions']).values('yearly_tax')
                        yearly_tax = yearly_tax[0]['yearly_tax']
                        yearly_tax = yearly_tax + \
                            (roundMassUp(mass)/100)*0.009*365

            elif year_registered < 2008:
                if motor_power == 'gasoline':
                    yearly_tax = TaxClass.objects.filter(
                        tax_norm='mass', tax_class=str(roundMassUp(mass))).values('yearly_tax')
                    yearly_tax = yearly_tax[0]['yearly_tax']
                elif motor_power == 'diesel':
                    yearly_tax = TaxClass.objects.filter(
                        tax_norm='mass', tax_class=str(roundMassUp(mass))).values('yearly_tax')
                    yearly_tax = yearly_tax[0]['yearly_tax']
                    yearly_tax = yearly_tax + (roundMassUp(mass)/100)*0.055*365

        # Calculate expenses before returning
        yearly_expenses = yearly_insurance + yearly_tax + \
            (fuel_price * consumption*(yearly_kilometers/100))
        yearly_expenses = round(yearly_expenses, 2)
        monthly_expenses = round(yearly_expenses/12, 2)

        # Return response as dict
        response_dict = {'yearly': yearly_expenses,
                         'monthly': monthly_expenses}

        return JsonResponse(response_dict)
