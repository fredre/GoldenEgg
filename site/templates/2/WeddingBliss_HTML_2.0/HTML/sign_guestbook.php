<?php
    //we need to get our variables first
    
    $email_to =   'your-email-address@mydomain.com'; //the address to which the email will be sent
    $guest_name     =   $_POST['guest-name'];  
    $guest_email    =   $_POST['guest-email'];
    $guest_message  =   $_POST['guest-message'];

    echo $guest_name.'<br>';
    echo $guest_email.'<br>';
    echo $guest_message.'<br>';
    
    /*the $header variable is for the additional headers in the mail function,
     we are asigning 2 values, first one is FROM and the second one is REPLY-TO.
     That way when we want to reply the email gmail(or yahoo or hotmail...) will know 
     who are we replying to. */
    $headers  = "From: $guest_email\r\n";
    $headers .= "Reply-To: $guest_email\r\n";

    $subject = "Mr/Mrs ".$guest_name." sent you an RSVP message";

    $finalmessage = "Mr/Mrs $guest_name sent you the following message: \n 
                    -------------------------------------------------------\n 
                    $guest_message \n 
                    -------------------------------------------------------\n
                    ";

    echo $headers.'<br>';
    echo $subject.'<br>';
     echo $finalmessage.'<br>';
    if(mail($email_to, $subject, $finalmessage, $headers)){
        echo 'sent'; // we are sending this text to the ajax request telling it that the mail is sent..      
    }else{
        echo 'failed';// ... or this one to tell it that it wasn't sent    
    }
?>