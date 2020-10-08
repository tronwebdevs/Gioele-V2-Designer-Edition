<?php
function badwords($username) {
  // NO NO WORDS LIST
  $regex = array(
    //sezione generale
    "/merd/i",
    "/cazz/i",
    "/negr/i",
    "/stupr/i",
    "/bastard/i",
    "/bocchinar/i",
    "/culo/i",
    "/coglion/i",
    "/puttana/i",
    "/troia/i",
    "/mignotta/i",
    "/fottut/i",
    "/handicap/i",
    "/mongolo/i",
    "/suicid/i",
    "/sborr/i",
    "/scopa/i",
    "/stronz/i",
    "/zoccol/i",
    "/succhia/i",
    "/mannaggia/i",
    "/tette/i",
    //sezione sessualità
    "/ricchione/i",
    "/froci/i",
    "/culatton/i",
    "/culaton/i",
    "/finocchi/i",
    "/lesbic/i",
    "/gay/i",
    //sezione Chiesa Cattolica
    "/madonna/i",
    "/diopo/i",
    "/dioladr/i",
    "/diostra/i",
    "/diobastard/i",
    "/dioca/i",
    "/diof/i",
    "/dioim/i",
    "/diom/i",
    "/dios/i",
    "/padrepio/i",
    //sezione QVANDO C'ERA LVI
    "/fascis/i",
    "/nazi/i",
    "/mussolini/i",
    "/hitler/i",
    "/benito/i",
    "/adolf/i",
    "/partigian/i",
    "/lager/i",
    "/gulag/i",
    "/stalin/i",
    "/lenin/i",
    "/ebrei/i",
    "/auschwitz/i",
    //sezione Politica (senza leader politici)
    "/comunis/i",
    "/liberalis/i",
    "/anarchi/i",
    //sezione internazionale
    "/faggot/i",
    "/nigger/i",
    "/retard/i",
    "/fuck/i",
    "/shit/i",
    "/kurwa/i", // polski
    "/bitch/i",
    "/hooker/i",
    "/whore/i",
      //sottosezione NAPOLI
      "/mammt/i",
      "/bucchin/i",
      "/uagliò/i",
      "/uaglio/i",
      "/kitte/i",
    //sezione malattie
    "/aids/i",
    "/hiv/i",
    "/coronavirus/i",
    "/covid/i",
    "/wuhan/i",
    //sezione personalizzata
  );

  //actual function
  $r = false;
  for ($i = 0; $i < count($regex); $i++){
    if (preg_match($regex[$i], $username) == 1){
      $r = true;
    }
  }
  return $r;
}
?>
