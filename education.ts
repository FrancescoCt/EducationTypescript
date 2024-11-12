//Tipi personalizzati

const subjectValues = ["Turismo", "Macelleria", "Insegnamento", "Artigianato"] as const;
const professionalCareerValues =["Calzolaio", "Fabbro", "Sarto", "Falegname", "Vetraio", "Restauratore", "Macellaio"]  as const;

type EducationLevelValues = "Alto" | "Medio" | "Basso";
type SubjectValues = (typeof subjectValues)[number];
type ProfessionalCareerValues = (typeof professionalCareerValues)[number];

//Funzioni di supporto
function CreaPartecipanti(numTotPartecipanti: number): Partecipante[]{
    let nomiTipo: string[] = ["Alexander", "Emma", "Liam", "Olivia", "Noah"];
    let cognomiTipo: string[] = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
    let paesiTipo: string[] = ["Marocco", "Bangladesh", "Nigeria", "Senegal", "Colombia"];

    let listaPartecipanti: Partecipante[] = [];

    for(let i : number = 0; i < numTotPartecipanti; i++){
        listaPartecipanti.push(new Partecipante(
            nomiTipo[Math.floor(Math.random() * nomiTipo.length)],
            cognomiTipo[Math.floor(Math.random() * cognomiTipo.length)],
            paesiTipo[Math.floor(Math.random() * paesiTipo.length)],
            "Medio",
            subjectValues[Math.floor(Math.random() * subjectValues.length)],
            ["Inglese B1", "Italiano A2"]
        ));
    };
    return listaPartecipanti;
}
function CreaCorsi(numTotCorsi: number): Corso[]{
    let listaCorsi: Corso[] = [];

    for(let i : number = 0; i < numTotCorsi; i++){
        listaCorsi.push(new Corso(
            "Corso per diventare "+professionalCareerValues[Math.floor(Math.random() * professionalCareerValues.length)],
            "Imparerai la professione di "+professionalCareerValues[Math.floor(Math.random() * professionalCareerValues.length)],
            professionalCareerValues[Math.floor(Math.random() * professionalCareerValues.length)],
            Math.floor(Math.random() * 100)
        ));
    };
    return listaCorsi;
}
function CreaAziende(numTotAziende: number): Azienda[]{
    let nomiBotteghe: string[] = [
        "La Bottega del",
        "Da Ernesto, ",
        "L'Angolo del",
        "Al Borgo"
    ];
    let posizioniAperte: string[] = [
        "Apprendista",
        "Stagista",
        "Senior"
    ];

    let listaAziende: Azienda[] = [];

    for(let i : number = 0; i < numTotAziende; i++){
        listaAziende.push(new Azienda(
            nomiBotteghe[Math.floor(Math.random() * nomiBotteghe.length)] +" "+professionalCareerValues[Math.floor(Math.random() * professionalCareerValues.length)],
            subjectValues[Math.floor(Math.random() * subjectValues.length)],
            "Azienda specializzata nel settore "+professionalCareerValues[Math.floor(Math.random() * professionalCareerValues.length)],
            posizioniAperte
        ));
    };
    return listaAziende;
}

//Definizione interfacce
interface IPartecipante{

    nome: string,
    cognome: string,
    paese: string,
    livelloIstruzione: EducationLevelValues,
    competenzeLinguistiche: string[],
    ambitoFormazioneInteresse: SubjectValues

    iscrivitiCorso(corso: ICorso): void;
}

interface ICorso{
    titolo: string,
    descrizione: string,
    settoreProfessionale: ProfessionalCareerValues,
    durata: number,
    elencoIscritti: IPartecipante[]

    aggiungiPartecipante(partecipante: IPartecipante):void;
}

interface IAzienda{
    nome: string,
    settoreAttivita: SubjectValues,
    descrizione: string,
    posizioniAperte: string[]

    offriPosizione(partecipante: IPartecipante, posizione: string): void;
}
//Definizione classi
class Partecipante implements IPartecipante{
    nome: string;
    cognome: string;
    paese: string;
    livelloIstruzione: EducationLevelValues;
    competenzeLinguistiche: string[] = [];
    ambitoFormazioneInteresse: SubjectValues

    constructor(
        nome: string, 
        cognome: string, 
        paese: string, 
        livelloIstruzione: EducationLevelValues, 
        ambitoFormazioneInteresse: SubjectValues,
        competenzeLinguistiche: string[]
    ){
        this.nome = nome;
        this.cognome = cognome;
        this.paese = paese;
        this.livelloIstruzione = livelloIstruzione;
        this.ambitoFormazioneInteresse = ambitoFormazioneInteresse;
        this.competenzeLinguistiche = competenzeLinguistiche;
    }

    iscrivitiCorso(corso: ICorso): void{
        console.log(this.nome+" "+this.cognome+" vuole iscriversi al corso: "+corso.titolo+"\n");
        corso.aggiungiPartecipante(this);
    };
}

class Corso implements ICorso{
    titolo: string;
    descrizione: string;
    settoreProfessionale: ProfessionalCareerValues;
    durata: number;
    elencoIscritti: IPartecipante[] = [];

    constructor(
        titolo: string,
        descrizione: string,
        settoreProfessionale: ProfessionalCareerValues,
        durata: number
    ){
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.settoreProfessionale = settoreProfessionale;
        this.durata = durata;
    }

    aggiungiPartecipante(partecipante: IPartecipante): void {
        try{
            if(!this.elencoIscritti.some(x => x === partecipante)){
                console.log("Aggiornamento elenco iscritti");
                this.elencoIscritti.push(partecipante);
                console.log("Riepilogo iscritti corso: "+this.titolo);
                this.elencoIscritti.forEach(iscritto => {
                    console.log(iscritto.nome+ '-' + iscritto.cognome);
                });
                console.info(partecipante.nome+" "+partecipante.cognome+" inserito al corso: "+this.titolo+"\n")
            }else{
                
                throw new PartecipanteAlredyExistsException(partecipante);
            }
        }
        catch(error){
            console.error(error.name+": "+error.message);
        }
    }
}

class Azienda implements IAzienda{
    nome: string;
    settoreAttivita: SubjectValues;
    descrizione: string;
    posizioniAperte: string[];

    private partecipantiFormati: IPartecipante[] = []

    constructor(
        nome: string,
        settoreAttivita: SubjectValues,
        descrizione: string,
        posizioniAperte: string[]
    ){
        this.nome = nome;
        this.settoreAttivita = settoreAttivita;
        this.descrizione = descrizione;
        this.posizioniAperte = posizioniAperte
    }

    offriPosizione(partecipante: IPartecipante, posizione: string): void{
        try{
            if(this.partecipantiFormati.some(x => x === partecipante)){
            console.info("Proposta di lavoro per partecipante "+partecipante.nome+" "+partecipante.cognome+" da "+this.nome+": "+posizione);
            }
            else{
                throw new PartecipanteNotFormedException(partecipante);
            }
        }
        catch(error){
            console.error(error.name+": "+error.message);
        }
        
        
    };

    getPartecipantiFormati(corsi: ICorso[]): void{
        let listaFormati: Partecipante[] = [];
        corsi.forEach(corso => {
            listaFormati.push(...corso.elencoIscritti);
        });
        console.log("L'azienda "+this.nome+" consulta la lista di persone iscritte ad un corso qualsiasi:\n")
        console.log(listaFormati)
        this.partecipantiFormati = listaFormati;
    }
}

//Definizione BusinessLogicExceptions
class PartecipanteNotFormedException extends Error {
    constructor(partecipante: Partecipante, message: string = "") {
        super(message)
        this.message = partecipante.nome+" "+partecipante.cognome+" non è stato ancora formato!";
        this.name = "Partecipante Not Formed Exception";
    }
}
class PartecipanteAlredyExistsException extends Error {
    constructor(partecipante: Partecipante, message: string = "") {
        super(message)
        this.message = "Partecipante "+partecipante.nome+" "+partecipante.cognome+" già presente nel corso, nuova iscrizione non riuscita\n!";
        this.name = "Partecipante Alredy Exists Exception";
    }
}

//Test creazione ambiente del sistema

let numTotPartecipanti: number = 10;
let numTotCorsi: number = 3;
let numTotAziende: number = 5;

let listaPartecipanti: Partecipante[] = CreaPartecipanti(numTotPartecipanti);
let listaCorsi: Corso[] = CreaCorsi(numTotCorsi);
let listaAziende: Azienda[] = CreaAziende(numTotAziende);

//Test tentativo iscrizione di un migrante non formato
console.log("--------- Test offerta posizione a partecipante non formato -------")
listaAziende[0].getPartecipantiFormati(listaCorsi);
listaAziende[0].offriPosizione(listaPartecipanti[0], listaAziende[0].posizioniAperte[0]);
console.log("-------------------------------------------------------------------")

//Test iscrizione dei partecipanti ad un corso
console.log("--------- Test iscrizioni partecipanti a corsi erogati -------")
listaPartecipanti[0].iscrivitiCorso(listaCorsi[0]);
listaPartecipanti[0].iscrivitiCorso(listaCorsi[0]);
listaPartecipanti[1].iscrivitiCorso(listaCorsi[0]);

listaPartecipanti[3].iscrivitiCorso(listaCorsi[1]);

listaPartecipanti[6].iscrivitiCorso(listaCorsi[2]);
console.log("-------------------------------------------------------------------")

//Test offerta di lavoro da parte delle aziende, si assume che gli iscritti abbiano già superato il corso
console.log("--------- Test offerta posizione a partecipanti formati -------")
listaAziende[0].getPartecipantiFormati(listaCorsi);
listaAziende[0].offriPosizione(listaPartecipanti[0], listaAziende[0].posizioniAperte[0]);
listaAziende[0].offriPosizione(listaPartecipanti[1], listaAziende[0].posizioniAperte[0]);
console.log("-------------------------------------------------------------------")




