<?php

// configure
$from = 'Contact form <contato@dobbinx3.com>';
$sendTo = 'dobbinx3@gmail.com';
$subject = '[DOBBINX3.COM] - Nova mensagem do formulário do site';
$fields = array('name' => 'Name', 'email' => 'Email', 'message' => 'Message'); // array variable name => Text to appear in the email
$okMessage = 'Sua mensagem foi enviada com sucesso. Obrigado e em breve entrarei em contato!';
$errorMessage = 'Ocorreu um problema ao tentar enviar sua mensagem. Por favor tente novamente mais tarde.';

// let's do the sending

if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])):
    //your site secret key
    $secret = 'COLOQUE_AQUI_SEU_SECRET';
    //get verify response data

    $c = curl_init('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    $verifyResponse = curl_exec($c);

    $responseData = json_decode($verifyResponse);
    if($responseData->success):

        try
        {
            $emailText = nl2br("Nova mensagem do formulário de contato\n");

            foreach ($_POST as $key => $value) {

                if (isset($fields[$key])) {
                    $emailText .= nl2br("$fields[$key]: $value\n");
                }
            }

            $headers = array('Content-Type: text/html; charset="UTF-8";',
                'From: ' . $from,
                'Reply-To: ' . $from,
                'Return-Path: ' . $from,
            );
            
            mail($sendTo, $subject, $emailText, implode("\n", $headers));

            $responseArray = array('type' => 'success', 'message' => $okMessage);
        }
        catch (\Exception $e)
        {
            $responseArray = array('type' => 'danger', 'message' => $errorMessage);
        }

        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            $encoded = json_encode($responseArray);

            header('Content-Type: application/json');

            echo $encoded;
        }
        else {
            echo $responseArray['message'];
        }

    else:
        $errorMessage = 'Verificação de robô falhou, por favor tente novamente.';
        $responseArray = array('type' => 'danger', 'message' => $errorMessage);
        $encoded = json_encode($responseArray);

            header('Content-Type: application/json');

            echo $encoded;
    endif;
else:
    $errorMessage = 'Por favor clique no box de reCAPTCHA.';
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    $encoded = json_encode($responseArray);

            header('Content-Type: application/json');

            echo $encoded;
endif;

