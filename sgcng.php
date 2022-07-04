<?php

session_start();

$name_pieces = json_decode(file_get_contents("name_pieces.json"), true);
['adjectives' => $adjectives, 'nouns' => $nouns, 'second_nouns' => $second_nouns] = $name_pieces;

function make_name($adjectives, $nouns, $second_nouns) {
	do {
		$noun = $nouns[rand(0, count($nouns) - 1)];

	} while ($noun == $_SESSION["last_noun"]);
    $_SESSION["last_noun"] = $noun;

    do {
        $adjective = $adjectives[rand(0, count($adjectives) - 1)];
    } while ($adjective == $_SESSION["last_adjective"]);
    $_SESSION["last_adjective"] = $adjective;

    do {
        $second_noun = $second_nouns[rand(0, count($second_nouns) - 1)];
    } while ($second_noun == $_SESSION["last_second_noun"]);
    $_SESSION["last_second_noun"] = $second_noun;
    
    return [$adjective, $noun, $second_noun, $last_adjective, $last_noun];
}

if (($_SERVER['HTTP_REFERER'] == 'https://deckply.com/companynames/') ||
    ($_SERVER['HTTP_REFERER'] == 'https://deckply.com/companynames/index.html') ||
    (file_exists('this_machine_is_okay'))){
    if (php_sapi_name() == "cli") {
        for ($i = 0; $i < 128; $i++) {
            [$adjective, $noun, $second_noun, $last_adjective, $last_noun] = 
                make_name($adjectives, $nouns, $second_nouns, $last_adjective, $last_noun);
            echo sprintf("%3d: %s %s %s\n", $i, $adjective, $noun, $second_noun);
        }
        echo sprintf("%d %d %d %d %d\n", count($adjectives), count($nouns), count($second_nouns),
            count($adjectives) * count($nouns), count($adjectives) * count($nouns) * count($second_nouns));
    }
    else {
        [$adjective, $noun, $second_noun, $last_adjective, $last_noun] = 
            make_name($adjectives, $nouns, $second_nouns, $last_adjective, $last_noun);
        echo sprintf("%s %s %s", $adjective, $noun, $second_noun);
    }
}

else {
    echo "Nope";
}

?>
