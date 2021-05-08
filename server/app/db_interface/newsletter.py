from app.models.models import EmailNewsletterSubscriber

def subscribe(email_address):
    e = EmailNewsletterSubscriber(email=email_address)
    e.save()