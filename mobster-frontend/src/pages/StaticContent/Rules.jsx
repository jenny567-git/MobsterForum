import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Rules = () => {
    const {
        user,
        isLoading,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();
  return (
    <div className="flex-space">
      <h1>Mobster rules and code of conduct</h1>

      <div>
        <h3>Brott mot reglerna</h3>
        <ul>
          <li>Respektera att alla har olika åsikter</li>
          <li>Personangrepp är strängt förbjudet</li>
          <li>Inga personliga uppgifter får publiceras</li>
          <li>
            Om du ser en tråd eller ett inlägg som bryter mot reglerna, skriv
            inte i det, rapportera via länken
          </li>
          <li>
            Vi tillåter inga inlägg som innehåller rasism, hat, hets mot
            folkgrupp eller inlägg som annars bryter mot lagen. I övrigt värnar
            vi om yttrandefriheten
          </li>
          <li>Sök på familjer eller trådar innan du skapar en ny</li>
          <li>
            Håll dig till ämnet i familjen och tråden, vi kan komma att radera
            inlägg som inte hör dit
          </li>
          <li>
            Det är inte tillåtet att spamma forumet med reklam, eller skapa egna
            trådar i syfte att göra reklam
          </li>
        </ul>
      </div>

      <h3>Brott mot reglerna</h3>
      <p>
        Om vi ser att du bryter mot reglerna kan det leda till att vi blockerar
        dig från forumet.
      </p>
      <p>
        Om du har blivit blockerad kan du höra av dig till
        contact.mobstersupport@gmail.com och be om ursäkt. Vi kanske släpper in
        dig igen.
      </p>
      <p>
        Brott mot svensk lag kommer att polisanmälas utan förvarning. Vi kommer
        även att ge polisen all information de behöver i ärendet.
      </p>

      <h3>Information och rättigheter</h3>
      <p>
        Outlaw forum, Mobster, forumets administratörer förbehåller sig rätten
        att censurera inlägg, blockera medlemmar från familjer och inlägg, eller
        från hela forumet eller på annat sätt agera så att forumets regler och
        riktlinjer följes. De har full bestämmanderätt och behöver inte
        rättfärdiga sina handlingar och beslut.
      </p>
      <h3>Ansvarsfriskrivning</h3>
      <p>
        Alla inlägg på Mobster Forum uttrycker skribentens åsikter och varken
        Mobster, Outlaw Forum eller dess administratörer kan hållas ansvariga
        för innehållet i dessa. Varje användare är ansvarig för sina egna
        inlägg. Vi reserverar oss rättigheten att ändra villkor och regler.
      </p>
      <div className="reg">
          <h5>Genom att trycka på Registrera nedan, bekräftar jag att jag godkänner reglerna</h5>
          {!isAuthenticated && (<button onClick={() => loginWithRedirect({screen_hint: "signup"})}><p>Register</p></button>)}
      </div>

    </div>
  );
};

export default Rules;
