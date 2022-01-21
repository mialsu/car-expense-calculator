from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import math

from api.models import TaxClass


class calculationResult(APIView):
    
    model = TaxClass


    def post(self, request, format=None):

        def roundMassUp(x):
            return int(math.ceil(x / 100.0)) * 100

        def roundMassDown(x):
            return int(math.floor(x / 100.0)) * 100

        data = request.data

        vehicle_type = data['vehicle-type']
        year_registered = int(data['year-registered'])
        mass = int(data['mass'])
        motor_power = data['motor-power']
        emissions = int(data['emissions'])
        consumption = float(data['consumption'])
        yearly_kilometers = int(data['yearly-kilometers'])
        yearly_insurance = float(data['yearly-insurance'])

        print(roundMassUp(mass))
        print((roundMassDown(mass)/100)*0.05*365)

        if vehicle_type == 'henkiloauto':
            if mass <= 2500:
                if year_registered >= 2001:
                    if motor_power == 'gasoline':
                        if year_registered >= 2020:
                            yearly_tax = TaxClass.objects.filter(tax_norm = 'wltp', tax_class = data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                        else:
                            yearly_tax = TaxClass.objects.filter(tax_norm = 'nedc', tax_class = data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                    elif motor_power == 'diesel':
                        if year_registered >= 2020:
                            yearly_tax = TaxClass.objects.filter(tax_norm = 'wltp', tax_class = data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                            yearly_tax = yearly_tax + (roundMassUp(mass)/100)*0.055*365
                        else:
                            yearly_tax = TaxClass.objects.filter(tax_norm = 'nedc', tax_class = data['emissions']).values('yearly_tax')
                            yearly_tax = yearly_tax[0]['yearly_tax']
                            yearly_tax = yearly_tax + (roundMassUp(mass)/100)*0.055*365
            #TODO: FIX BELOW                
                elif year_registered < 2001:
                    if motor_power == 'gasoline':
                        yearly_tax = TaxClass.objects.filter(tax_norm = 'mass', tax_class = str(data[roundMassUp(mass)])).values('yearly_tax')
                    elif motor_power == 'diesel':
                        yearly_tax = TaxClass.objects.filter(tax_norm = 'mass', tax_class = str(data[roundMassUp(mass)])).values('yearly_tax')
                        yearly_tax = yearly_tax + (roundMassUp(mass)/100)*0.055*365
            elif mass > 2500:
                if motor_power == 'gasoline':
                        yearly_tax = TaxClass.objects.filter(tax_norm = 'mass', tax_class = data[roundMassUp(mass)]).values('yearly_tax')
                elif motor_power == 'diesel':
                        yearly_tax = TaxClass.objects.filter(tax_norm = 'mass', tax_class = data[roundMassUp(mass)]).values('yearly_tax')
                        yearly_tax = yearly_tax + (roundMassUp(mass)/100)*0.055*365
        else:
            pass

        return Response(yearly_tax, status=200)