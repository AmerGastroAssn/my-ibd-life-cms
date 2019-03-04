import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
    id: string;
    contact: Contact;

    constructor(
        private contactService: ContactService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each contact's details
        this.contactService.getContact(this.id).subscribe((contactInfo) => {
            if (contactInfo !== null) {
                this.contact = contactInfo;
                console.log('this.contact', this.contact);
            }
        });
    }

    onDeleteContact(id) {
        this.contactService.deleteContact(id);
    }

    onMarkViewed(id) {
        this.contactService.setViewedContact(id);
    }

    onUnmarkViewed(id) {
        this.contactService.setUnviewedContact(id);
    }

}
