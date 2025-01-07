<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactForm;
use Illuminate\Support\Facades\Auth;


class ContactFormController extends Controller
{
    public function create()
    {
        return view('contact-form');
    }

    public function store(Request $request)
    {
        
        // simple validation 
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'dob' => 'required|date',
            'email' => 'required|email|max:255',
            'ssn' => 'required|string|size:9|regex:/^\d{9}$/',
        ]);
    
        // to encrypt or not to encrypt? considering these are very important info that cannot be leaked no matter what, I believe encryption is good.
        ContactForm::create([
            'user_id' => Auth::id(),
            'name' => encrypt($validated['name']),
            'dob' => encrypt($validated['dob']),
            'email' => encrypt($validated['email']),
            'ssn' => encrypt($validated['ssn']),
        ]);
    
        return redirect()->route('contact-form')->with('success', 'Contact form submitted successfully!');
    }


    // only admin can access this
    public function view()
    {
        $contactForms = ContactForm::all();

        foreach ($contactForms as $contactForm) {
            $contactForm->name = decrypt($contactForm->name);
            $contactForm->dob = decrypt($contactForm->dob);
            $contactForm->email = decrypt($contactForm->email);
            $contactForm->ssn = decrypt($contactForm->ssn);
        }
        
        return view('admin.view-contact', compact('contactForms'));
    }

}
