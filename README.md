Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# Titel
<!-- Geef je project een titel en schrijf in één zin wat het is -->

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<img width="959" height="473" alt="image" src="https://github.com/user-attachments/assets/c83a0701-0024-409a-8fff-c0f354663398" />
<img width="958" height="476" alt="image" src="https://github.com/user-attachments/assets/6a324271-e6ce-4230-a530-73b503749ea8" />
<img width="959" height="470" alt="image" src="https://github.com/user-attachments/assets/6c50d7ba-3622-4c63-b797-a9650c720181" />
<img width="959" height="473" alt="image" src="https://github.com/user-attachments/assets/fad2dbae-a98d-4422-b1fd-e1a3d92263bf" />


Voor deze opdracht heb ik een woningplatform ontwikkeld bestaande uit een homepagina, een detailpagina en een favorietenpagina. Op de homepagina worden alle beschikbare woningen weergegeven. Via de detailpagina kunnen gebruikers meer informatie bekijken over een specifieke woning. Daarnaast is er een favorietenpagina waarop opgeslagen woningen worden verzameld en weergegeven.

Nadat de basis van de website was opgebouwd, heb ik een interactieve bewaren-functionaliteit ontworpen en ontwikkeld. Het probleem was dat gebruikers geen duidelijke feedback kregen wanneer zij op de bewaren-knop klikten. Hierdoor was het onduidelijk of een woning daadwerkelijk was opgeslagen als favoriet.

Om dit probleem op te lossen heb ik een complete post-interactie flow toegevoegd. Wanneer een gebruiker op de bewaren-knop klikt, verschijnt eerst een loading state met een roterende animatie. Vervolgens vliegt een hart-icoon van de knop naar de favorieten-tab in de navigatie, waardoor visueel duidelijk wordt waar de woning wordt opgeslagen. Daarna verandert de knop naar een groene successtatus en verschijnt er een groene popup met een bevestigingsmelding dat de woning succesvol is opgeslagen. Tegelijkertijd wordt de favorieten teller in de navigatie bijgewerkt.

Wanneer de gebruiker opnieuw op dezelfde knop klikt, wordt de woning uit de favorieten verwijderd. Ook hierbij wordt eerst een loading state weergegeven, gevolgd door dezelfde hart-animatie. Vervolgens verandert de knop naar een rode status en verschijnt er een rode popup die bevestigt dat de woning uit de favorieten is verwijderd.

Door deze combinatie van loading states, animaties, kleurveranderingen, popups en een dynamische favorieten teller krijgt de gebruiker tijdens iedere stap van de interactie duidelijke feedback. Dit zorgt voor meer vertrouwen, minder verwarring en een gebruiksvriendelijkere ervaring.

## Post Interactie

<img width="959" height="474" alt="image" src="https://github.com/user-attachments/assets/40c99c7d-58fd-4277-9d57-d9d582cc473e" />

<img width="260" height="346" alt="image" src="https://github.com/user-attachments/assets/900bb0c7-250a-4934-8d03-93a762e22927" />

<img width="959" height="472" alt="image" src="https://github.com/user-attachments/assets/be313a38-ec17-4c0d-9ada-94e5b99b5bc3" />

<img width="959" height="471" alt="image" src="https://github.com/user-attachments/assets/17527b97-8096-4c2e-bd3e-2e53b5b2d738" />

<img width="959" height="473" alt="image" src="https://github.com/user-attachments/assets/fad2dbae-a98d-4422-b1fd-e1a3d92263bf" />



## Gebruik
De website maakt het mogelijk om woningen te bekijken, woningdetails te openen en woningen op te slaan als favoriet. Op de detailpagina kan een gebruiker een woning bewaren via de bewaren-knop. Tijdens deze interactie ontvangt de gebruiker direct feedback door middel van animaties, kleurveranderingen en popups. Op de favorietenpagina kunnen opgeslagen woningen worden bekeken en verwijderd.

## Kenmerken
De website bevat een homepagina met een overzicht van woningen, een detailpagina met uitgebreide woninginformatie en een favorietenpagina waarop opgeslagen woningen worden weergegeven. Daarnaast is er een interactieve bewaren-functionaliteit ontwikkeld met loading states, een hart-animatie, succes- en foutmeldingen en een dynamische favorieten teller. Door deze toevoegingen krijgt de gebruiker tijdens elke stap van de interactie duidelijke feedback.

## Installatie
Om het project lokaal te gebruiken moet eerst de repository worden gekloond. Vervolgens kan naar de projectmap worden genavigeerd en kunnen de benodigde dependencies worden geïnstalleerd. Daarna kan de server worden gestart en is de website lokaal te bekijken via de browser.

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
