import csv
from operator import delitem
from django.core.management import BaseCommand
from django.utils import timezone

from api.models import TaxClass

class Command(BaseCommand):
    help = "Loads products and product categories from CSV file."

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str)

    def handle(self, *args, **options):
        start_time = timezone.now()
        file_path = options['file_path']
        with open (file_path, 'r') as csv_file:
            data = csv.reader(csv_file, delimiter = ',')
            next(data, None)  # skip the headers
            classes = []
            for row in data:
                taxclass=TaxClass(
                    tax_norm=row[2],
                    tax_class=int(row[0]),
                    yearly_tax=float(row[1])
                )
                classes.append(taxclass)
        if classes:
            TaxClass.objects.bulk_create(classes)
        
        end_time = timezone.now()

        self.stdout.write(
            self.style.SUCCESS(
                f"Loading CSV took: {(end_time-start_time).total_seconds()} seconds."
            )
        )