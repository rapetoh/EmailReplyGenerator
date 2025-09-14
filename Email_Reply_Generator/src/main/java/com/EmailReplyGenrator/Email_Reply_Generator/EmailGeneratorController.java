package com.EmailReplyGenrator.Email_Reply_Generator;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = {"http://localhost:5173", "https://mail.google.com"})
@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {

        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);

    }

}



/*
*
*
* The @RequestBody tells Spring to automatically deserialize the incoming JSON into a EmailRequest Java object.
*
*
*
*
* This line: @AllArgsConstructor is just a shortcut (from Lombok) that automatically generates:
public EmailGeneratorController(EmailGeneratorService emailGeneratorService) {
    this.emailGeneratorService = emailGeneratorService;
}
So instead of writing the constructor yourself, Lombok does it for you. And it auto-injects the emailGeneratorService by doing that.
*
*
*
*
*
* */
