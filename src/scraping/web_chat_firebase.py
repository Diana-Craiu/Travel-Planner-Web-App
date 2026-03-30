import sys
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import re
from unidecode import unidecode
import firebase_admin
from firebase_admin import credentials, firestore
from lxml import html
import requests
from polyline import decode
import smtplib
from email.message import EmailMessage
from math import ceil

app = Flask(__name__)
CORS(app)

# cheia pentru API-ul de la OpenAI
openai.api_key = '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'

# token-ul pentru Mapbox
access_token = "sk.eyJ1IjoiZGlhbmFjcjE0MTgiLCJhIjoiY2x2d2Jldm1vMW90djJrbnk1d29oOTBpZSJ9.BuE_ICsXflKbPkVBYsRrgA"

# credentialele pentru trimiterea de email-uri
EMAIL_ADDRESS = 'mihaelacraiu100@gmail.com'
EMAIL_PASSWORD = 'tcxs fnuk bmoi sjhx'

# Initialize Firebase Admin SDK
cred = credentials.Certificate("wanderweave-9873e-firebase-adminsdk-seeds-3bfb2fc8cd.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# functia pentru normalizarea sirului de caractere
def normalize_string(text):
    text = unidecode(text)
    text = re.sub(r'\W+', '_', text.lower())
    return text

# functia pentru incrementarea contorului pentru o atractie dintr-un oras
def increment_counter(city, attraction_name):
    city_ref = db.collection(normalize_string(city))
    attraction_ref = city_ref.document(normalize_string(attraction_name))
    attraction_data = attraction_ref.get().to_dict()
    if attraction_data:
        counter = attraction_data.get('counter', 0)
        counter += 1
        attraction_ref.update({'counter': counter})
    else:
        attraction_ref.set({
            'name': attraction_name,
            'counter': 1,
            'website': ''
        })

# functia pentru verificarea existentei tabelei pentru un oras din baza de date
def city_table_exists(city):
    city_ref = db.collection(normalize_string(city))
    return city_ref.get()

# functia pentru verificarea daca o anumita atractie exista pentru un anume oras
def attraction_exists(city, attraction_name):
    city_ref = db.collection(normalize_string(city))
    attraction_ref = city_ref.document(normalize_string(attraction_name.strip())) 
    return attraction_ref.get()

# functia pentru crearea tabelei orasului
def create_city_table(city):
    city_ref = db.collection(normalize_string(city))
    city_ref.document('metadata').set({'counter': 0})

# functia pentru inserarea unei atractii intr-un oras
def insert_attraction(city, attraction):
    if not city_table_exists(city):
        create_city_table(city)

    if attraction_exists(city, attraction['name']):
        print(f"Atracția '{attraction['name']}' există deja în baza de date pentru orașul '{city}'.")
        increment_counter(city, attraction['name'])
        return

    city_ref = db.collection(normalize_string(city))
    attraction_ref = city_ref.document(normalize_string(attraction['name']))
    attraction_ref.set({
        'name': attraction['name'],
        'counter': 1,
        'website': ''
    })


# def extract_tourist_attractions_from_url(url):
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')
#     attractions = [h2_tag.text.strip() for h2_tag in soup.find_all('h2')]
#     return attractions

# def extract_tourist_attractions_from_url(url):
#     response = requests.get(url)
#     if response.status_code == 200:
#         tree = html.fromstring(response.content)
#         attractions = tree.xpath('//h2/text()')
#         return [attraction.strip() for attraction in attractions]
#     else:
#         print(f"Request failed with status code: {response.status_code}")
#         return []

# functia pentru extragerea atractiilor turistice dintr-un URL utilizand expresii regulate
def extract_tourist_attractions_from_url(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            attractions = re.findall(r'<h2[^>]*>(?:<[^>]+>)*([^<]+)(?:<[^>]+>)*</h2>', response.text)
            clean_attractions = [attraction.strip() for attraction in attractions]
            return clean_attractions
        else:
            print(f"Failed to fetch URL: {url}. Status code: {response.status_code}")
            return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

# functia pentru extragerea atractiilor turistice din mai multe URL-uri
def extract_tourist_attractions_from_urls(urls):
    all_attractions = []
    for url in urls:
        attractions = extract_tourist_attractions_from_url(url)
        all_attractions.extend(attractions)
    return all_attractions

# functia pentru citirea de URL-uri dintr-un fisier
def read_urls_from_file(filename):
    with open(filename, 'r') as file:
        urls = [url.strip() for url in file.readlines()]
    return urls

# functia pentru filtrarea atractiilor dupa oras
def filter_attractions_by_city(attractions, city):
    filtered_attractions = [attraction for attraction in attractions if city.lower() in attraction.lower()]
    return filtered_attractions

# functia pentru parsarea listei de atractii din text
def parse_attractions_list(attractions_text):
    attractions_list = re.findall(r'\d+\.\s+(.*)', attractions_text)
    return attractions_list


# def read_events_from_file(filename):
#     with open(filename, 'r') as file:
#         lines = file.readlines()
#         events_dict = {}
#         for line in lines:
#             parts = line.split(' : ')
#             attraction = parts[0].strip()
#             event_url = parts[1].strip()
#             events_dict[attraction] = event_url
#         return events_dict

# events_dict = read_events_from_file('events.txt')

# functia pentru obtinerea oraselor de pe ruta dintre doua orase
def get_cities_between(start_city, end_city):

    if not start_city or not end_city:
        raise ValueError("Both start_city and end_city must be provided.")

    start_coords = geocode_city(start_city)
    end_coords = geocode_city(end_city)

    if start_coords is None or end_coords is None:
        print("Error obtaining city coordinates. Check city names and try again.")
        return []

    route_url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{start_coords[0]},{start_coords[1]};{end_coords[0]},{end_coords[1]}?access_token={access_token}"

    route_response = requests.get(route_url)
    route_data = route_response.json()  

    if route_response.status_code != 200 or 'routes' not in route_data or len(route_data['routes']) == 0:
        print("Error obtaining route. Check locations and try again.")
        return []

    route_geometry = decode(route_data['routes'][0]['geometry'])

    cities_between = []
    for lon, lat in route_geometry:
        city_name = reverse_geocode(lon, lat)
        if city_name:
            cities_between.append(city_name)

    unique_cities = []
    for city in cities_between:
        if city not in unique_cities:
            unique_cities.append(city)

    return unique_cities

# functia pentru geocodificarea unui oras
def geocode_city(city_name):

    response = requests.get(f"https://api.mapbox.com/geocoding/v5/mapbox.places/{city_name}.json?access_token={access_token}")

    
    if response.status_code == 200:
        data = response.json()
        if data['features']:
            
            coordinates = data['features'][0]['geometry']['coordinates']
            return coordinates[::-1]  
    return None

# functia pentru geocodificarea inversa a unui oras
def reverse_geocode(lon, lat):
   
    response = requests.get(f"https://api.mapbox.com/geocoding/v5/mapbox.places/{lon},{lat}.json?access_token={access_token}")

    if response.status_code == 200:
        data = response.json()
        if data['features']:
            city_name = data['features'][0]['place_name']
            return city_name
    return None

def calculeaza_timp_deplasare(durata_vizita, numar_atractii, distanta_medie=2, viteza_medie=5):
   
    timp_deplasare = ((numar_atractii - 1) * distanta_medie) / viteza_medie
    durata_totala = durata_vizita + timp_deplasare
    return durata_totala

# functia care calculeaza estimativ de cate zile are nevoie utilizatorul pentru a vizita toate atractiile turistice date
def calculeaza_zile_vizitare(atractii):
    ore_pe_zi = 10  # de la 10 AM la 9 PM

    def conversie_la_ore(durata):
        unitati = durata.split()
        if len(unitati) == 2:
            try:
                numar = int(unitati[0])
                if "oră" in unitati[1] or "ore" in unitati[1]:
                    return numar
                elif "minut" in unitati[1] or "minute" in unitati[1]:
                    return numar / 60  
            except ValueError:
                return 0
        elif len(unitati) == 4:
            try:
                ore = int(unitati[0])
                minute = int(unitati[2])
                return ore + (minute / 60)
            except ValueError:
                return 0
        return 0


    timp_total = 0
    for atractie in atractii:
        try:
            durata = atractie.split(" - ")[1]
            timp_total += conversie_la_ore(durata)
        except IndexError:
            print(f"Format invalid pentru atracție: {atractie}")
            continue
        except Exception as e:
            print(f"Eroare în timpul conversiei pentru atracția {atractie}: {e}")
            continue

    # consideram pauze și mese (aproximativ 2 ore pe zi)
    pauze_pe_zi = 2
    try:
        timp_total += pauze_pe_zi * ceil(timp_total / ore_pe_zi)
    except ZeroDivisionError:
        print("Eroare: Numărul de ore pe zi este 0. Verifică setările.")

    timp_total = calculeaza_timp_deplasare(timp_total, len(atractii))
    try:
        zile_necesare = ceil(timp_total / ore_pe_zi)
        return zile_necesare
    except ZeroDivisionError:
        print("Eroare: Numărul de ore pe zi este 0. Verifică setările.")
        return 0

# functia care parseaza lista ce contine timpul aferent fiecarei atractii
def parse_list_ore(text):
    lines = text.split("\n")
    attractions = []
    for line in lines:
        if " - " in line and line.strip().isdigit() == False:
            attractions.append(line.strip())
    return attractions

# functia principala ce foloseste prompt-uri gpt si leaga toate elementele intre ele
@app.route('/get_attractions', methods=['POST'])
def get_attractions():
    data = request.get_json()
    print(data)
    city = data.get('city', '')
    start_city = data.get('startCity', '')
    turism_types = data.get('turismTypes', [])
    nr_Zile = data.get('nrZile', '')
    end_city=city
    print(turism_types)
    print()
    print("Nr de zile: ", nr_Zile)
    if city:
        input_filename = 'urls.txt'
        urls = read_urls_from_file(input_filename)
        tourist_attractions = extract_tourist_attractions_from_urls(urls)
        print(tourist_attractions)
        filtered_attractions = filter_attractions_by_city(tourist_attractions, city)

        attractions_text = "\n".join(filtered_attractions)
        print(attractions_text)
        # attractions_text=''
        if attractions_text != '':
            messages = [
                {"role": "system", "content": "You are an intelligent assistant."},
                {"role": "user",
                 "content": f"Afișează te rog sub formă de listă, cu numere, doar denumirile atracțiilor turistice, fara sa mentionezi judetul/orasul sau alte detalii/descrieri ale atractiei si fara alt mesaj de la tine, din următorul text: {attractions_text}. In caz de sunt mai putin de 10 atracții din orasul dat: {city} mai adauga tu in lista te rog. Te rog NU ADAUGA NICIO PARANTENZA cu detalii, etc."},
            ]
        else:
            messages = [
                {"role": "system", "content": "You are an intelligent assistant."},
                {"role": "user",
                 "content": f"Afișează te rog sub formă de listă numerotata 10 atractii tursitice, fara sa mentionezi judetul/orasul sau alte detalii/descrieri si fara alt mesaj de la tine, din următorul oras: {city}"},
            ]
        chat = openai.ChatCompletion.create(model="gpt-4o", messages=messages)
        reply = chat.choices[0].message.content
        print(reply)

        if not turism_types:
            print("Nu exista tipuri de turism!!!!")
            reply=reply
        else:
            print("Filtrata dupa tipuri de turism")
            print(turism_types)
            messages4 = [
                {"role": "system", "content": "You are an intelligent assistant."},
                {"role": "user",
                    "content": f"Afișează te rog sub formă de listă, cu numere, doar denumirile atracțiilor turistice, fara sa mentionezi judetul/orasul sau alte detalii/descrieri ale atractiei si fara alt mesaj de la tine, care se incadreaza in urmatoarele tipuri de turism: {turism_types} din următoarea lista: {reply}. In caz ca atractiile din lista nu se incadreaza in toate tipurile de turism date, adauga de la tine in lista de atractii fara sa depaseasca lista 10 elemente, atractii din orasul {city}, care sa se incadreze in toate tipurile de tursim date. Tine cont ca DACA NU AI 10 ATRACTII in lista MAI ADAUGA TU CARE SA FIE IN TIPURILE DE TURISM DATE. Te rog NU ADAUGA NICIO PARANTENZA cu detalii, etc."},
            ]
            chat4 = openai.ChatCompletion.create(model="gpt-4o", messages=messages4)
            reply= chat4.choices[0].message.content
            print(reply)

        attractions_list = parse_attractions_list(reply)
        print(attractions_list)

        messages2 = [
                {"role": "system", "content": "You are an intelligent assistant."},
                {"role": "user",
                 "content": f"Afișează te rog sub formă de listă, cu numere, programul de lucru cu publicul al atractiilor turistice din lista data, FARA alte detalii/propozitii de la tine in PARANTEZA sau in alt mod: {attractions_list}, menționând pentru fiecare atracție programul de lucru cu publicul. Si verifica te rog ca acele destinatii din lista sa fie din orasul {city}, daca nu sunt corecteaza. Te rog nu adauga comentarii de la tn decat numele atractiei si programul. Nu adauga nimic in paranteze te rog. Te rog NU ADAUGA NICIO PARANTENZA cu detalii, etc. "},
            ]
        chat2 = openai.ChatCompletion.create(model="gpt-4-turbo", messages=messages2)
        program= chat2.choices[0].message.content
        print(program)

        messages3 = [
                {"role": "system", "content": "You are an intelligent assistant."},
                {"role": "user",
                 "content": f"Afișează te rog sub formă de listă, cu numere, cat crezi ca ar doar in ORE (si sa mentionezi cuvintele ore sau minute depinde de caz, daca e mai putin de o ora scrie in minute te rog si scrie direct un numar de ore/minute nu 2-3 ore etc) sa vizitezi aproximativ fiecare atractie, fara alte detalii/propozitii de la tine: {attractions_list}. Te rog afiseaza doar lista de forma atractie turistica-timp fara alte propozitii. Si verifica te rog ca acele destinatii din lista sa fie din orasul {city}, daca nu sunt corecteaza te rog. Te rog NU ADAUGA NICIO PARANTENZA cu detalii, etc."},
            ]
        chat3 = openai.ChatCompletion.create(model="gpt-4o", messages=messages3)
        timp= chat3.choices[0].message.content
        print("Timp necesar de vizitare:")
        print(timp)

        timp_list = parse_list_ore(timp)
        print(timp_list)

        estimare_zile = calculeaza_zile_vizitare(timp_list)
        print(estimare_zile)

        messages7 = [
                {"role": "system", "content": "You are an intelligent assistant."},
                {"role": "user",
                 "content": f"Dupa un calcul a iesit ca utilizatorul ar avea nevoie de {estimare_zile} (incepe descrierea cu cate zile am estimat noi) pentru a vizita atractiile date {reply}. El a introdus in aplicatie durata vacantei, fiind {nr_Zile}. Ai putea sa ii creezi un itinerariu in functie de urmatoarele lucruri. Daca estimarea noastra este mai mare decat cate zile are el la dispozitie sa ii recomanzi doar anumite atractii, iar daca are mai multe zile la dispozitie sa ii imparti in zi atractiile in asa fel incat sa acopere toate zilele si poti sa mai adaugi atractii de la tine ca sa acopere timpul. In ambele cazuri fa-i ca un fel de itinerariu/ ghid turistic. Daca utilizatorul nu introduce nr de zile, fa o estimare dupa calculul nostru si un itinerariu. Nu folosi cuvinte precum utilizatorul, etc. Foloseste noi va recomandam, etc"},
            ]
        chat7 = openai.ChatCompletion.create(model="gpt-4o", messages=messages7)
        detalii_itinerariu= chat7.choices[0].message.content
        print("Itinerariu:")
        print(detalii_itinerariu)


        for attraction_name in attractions_list:
            attraction = {'name': attraction_name}
            insert_attraction(city, attraction)
        
        # print()
        # print(reply)
        cities_between = get_cities_between(start_city, end_city)
        print(f"Cities between {start_city} and {end_city}: {cities_between}")

        messages3 = [
                {"role": "system", "content": "You are an intelligent assistant."},
                {"role": "user",
                 "content": f"Afișează te rog sub formă de listă, cu numere, 5 orase mari (orase cunoscute, nu mici de care nu a auzit nimeni), fara DUPLICATE la judet/oras (NEAPARAT exact 5 FARA SA MENTIONEZI orasele de start si stop) din Romania (fara sa mentionezi numele tarii in raspuns) aflate pe ruta principala dintre cele 2 orase: start {start_city} si destinatie {end_city}, fara alte detalii/propozitii de la tine. Am extras si aceste informatii prin geolocatie inversa ca sa te bazezi pe ele in raspunsul dat:{cities_between}. Te rog NU ADAUGA NICIO PARANTENZA cu detalii, etc."},
            ]
        chat3 = openai.ChatCompletion.create(model="gpt-4o", messages=messages3)
        rute= chat3.choices[0].message.content
        print(rute)

        rute_list = parse_attractions_list(rute)
        rute_list = list(set(rute_list))
        print(rute_list)

        city_attractions = {}

        for oras in rute_list:
            filtered_attractions2 = filter_attractions_by_city(tourist_attractions, oras)
            city_attractions[oras] = filtered_attractions2
        
        print(city_attractions)

        messages_rute = [
                {"role": "system", "content": "You are an intelligent assistant."},
                {"role": "user",
                 "content": f"Afișează te rog sub formă descriere (te rog nu folosi fraze precum desigur, sau altceva la inceput, incepe direct cu indicatiile), ce ar putea vizita un turist bazat pe lista {city_attractions}, daca dictionarul este gol, atunci preia ruta de aici {rute_list} si scrie tu 3 atractii din fiecare oras/judet din ruta, din fiecare oras din lista, maxim 3 atractii turistice din fiecare oras, iar daca in lista nu exista atractii pentru vreun oras, ofera tu 3 cele mai cunoscute atractii din acel oras. Verifica te rog si daca din lista data atractiile chiar apartin oraselor, daca nu schimba tu doar ce nu apartine cu unele care apartin. Tine cont cand realizezi textul ca omul ar trebui treaca cu masina spre destinatia finala adica {city}, te rog afiseaza in ordinea logica a rutei intre cele 2 orase {start_city} si {city}."},
            ]
        chat_rute = openai.ChatCompletion.create(model="gpt-4o", messages=messages_rute)
        rute_detalii= chat_rute.choices[0].message.content
        print(rute_detalii)

    
        return jsonify({'attractions': reply,'program': program, 'ruta': rute, 'timp': timp, 'recomandare': detalii_itinerariu, 'detalii_rute': rute_detalii})
    else:
        return jsonify({'error': 'Numele orașului lipsește!'})
    

# functia pentru incarcare a rating urilor in baza de date
@app.route('/submit_ratings', methods=['POST'])
def submit_ratings():
    data = request.get_json()
    city = data.get('city', '')  
    if not city:
        return jsonify({'error': 'Numele orașului lipsește!'})

    for attraction_name, rating in data.items():
        update_reviews(city, attraction_name, rating)

    return jsonify({'success': True})

# functia ce face update la nr de recenzii la fiecare atractie
def update_reviews(city, attraction_name, rating):
    city_ref = db.collection(normalize_string(city))
    attraction_ref = city_ref.document(normalize_string(attraction_name.strip()))
    attraction_data = attraction_ref.get().to_dict()
    if attraction_data:
        total_reviews = attraction_data.get('total_reviews', 0) + 1
        attraction_ref.update({'total_reviews': total_reviews})

        if rating == 5:
            reviews_5_stars = attraction_data.get('recenzii_5_stele', 0) + 1
            attraction_ref.update({'recenzii_5_stele': reviews_5_stars})
        elif rating == 4:
            reviews_4_stars = attraction_data.get('recenzii_4_stele', 0) + 1
            attraction_ref.update({'recenzii_4_stele': reviews_4_stars})
        elif rating == 3:
            reviews_3_stars = attraction_data.get('recenzii_3_stele', 0) + 1
            attraction_ref.update({'recenzii_3_stele': reviews_3_stars})
        elif rating == 2:
            reviews_2_stars = attraction_data.get('recenzii_2_stele', 0) + 1
            attraction_ref.update({'recenzii_2_stele': reviews_2_stars})
        elif rating == 1:
            reviews_1_stars = attraction_data.get('recenzii_1_stele', 0) + 1
            attraction_ref.update({'recenzii_1_stele': reviews_1_stars})
    else:
        print(f"Atracția '{attraction_name}' nu există în baza de date pentru orașul '{city}'.")

# functia ce se ocupa cu trimiterea email ului
@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.json
    subject = data['subject']
    content = data['content']

    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS
    msg.set_content(content)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)

    return jsonify({'message': 'Email sent successfully'}), 200

# functia ce incarca preferintele utilizatorului in baza de date
@app.route('/incarca_preferinte', methods=['POST'])
def incarca_preferinte():
    try:
        data = request.get_json()
        user_id = data['userId']
        preference = data['preferences']

        # rferinta la colectia de preferinte a utilizatorului
        preferences_ref = db.collection('users').document(user_id).collection('preferences')

        # adaugam preferinta ca document nou in colectia de preferinte
        preferences_ref.add(preference)

        return jsonify({"message": "Preferințele au fost salvate cu succes!"}), 200
    except Exception as e:
        print(f"Eroare la salvarea preferințelor: {e}")
        return jsonify({"error": "Eroare la salvarea preferințelor"}), 500

# functia ce returneaza preferintele utilizatorilor din baza de date
@app.route('/get_preferences', methods=['POST'])
def get_preferences():
    try:
        data = request.get_json()
        user_id = data['userId']

        # referinta la colectia de preferinte a utilizatorului
        preferences_ref = db.collection('users').document(user_id).collection('preferences')
        preferences = [doc.to_dict() for doc in preferences_ref.stream()]

        return jsonify({"preferences": preferences}), 200
    except Exception as e:
        print(f"Eroare la extragerea preferințelor: {e}")
        return jsonify({"error": "Eroare la extragerea preferințelor"}), 500


if __name__ == '__main__':
    app.run(debug=True)
