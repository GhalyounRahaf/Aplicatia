#Backend
# Aplicația Django REST Framework

Aceasta este o aplicație Django REST Framework care oferă un API RESTful pentru interacțiunea cu datele aplicației.

## Condiții preliminare

Înainte de a rula aplicația, asigurați-vă că aveți următoarele instalate:

- Python 3.x
- pip (instalator de pachete Python)

## Instalare

1. Clonați depozitul sau descărcați codul sursă.

2. Navigați la directorul proiectului:
cd director_proiect

3. Creați un mediu virtual (opțional, dar recomandat):
python -m venv env

4. Activați mediul virtual:

- Pe Windows:
env\Scripts\activate


5. Instalați pachetele Python necesare:

pip install

## Configurarea bazei de date

Această aplicație utilizează o bază de date SQLite în mod implicit. Dacă doriți să utilizați un alt motor de bază de date, actualizați setarea `DATABASES` în fișierul `settings.py` în consecință.

1. Aplicați migrarea bazei de date:
python manage.py migrate


Această comandă va crea tabelele de baze de date necesare pe baza modelelor Django.


## Crearea unui superutilizator

Pentru a crea un cont de superutilizator pentru accesarea interfeței de administrare Django, rulați următoarea comandă:


Urmați instrucțiunile pentru a introduce un nume de utilizator, e-mail și parolă pentru superutilizator.

python manage.py createsuperuser

#Frontend
instalați pachetele node
si rula 
npm run dev 

## Rularea aplicației

1. Porniți serverul de dezvoltare:

python manage.py runserver

Aplicația va fi accesibilă implicit la `http://localhost:8000/`.

2. Accesați punctele finale API folosind un instrument precum Postman, cURL sau browserul dvs. web.
