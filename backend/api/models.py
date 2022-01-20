from django.db import models

class TaxClass(models.Model):
    tax_norm = models.CharField(max_length=10)
    tax_class = models.IntegerField()
    yearly_tax = models.FloatField()

    def _str_(self):
     return self.tax_norm + str(self.tax_class)

    def __str__(self):
	    return unicode(self).encode('utf-8')

