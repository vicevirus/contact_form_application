<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Contact Form') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @endif

                <form action="{{ route('contact-form.store') }}" method="POST" id="contactForm">
                    @csrf

                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 font-medium">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            class="form-control border rounded w-full p-2"
                            value="{{ old('name') }}" 
                            required
                            maxlength="255"
                        >
                        @error('name') <small class="text-red-600">{{ $message }}</small> @enderror
                    </div>

                    <div class="mb-4">
                        <label for="dob" class="block text-gray-700 font-medium">Date of Birth</label>
                        <input 
                            type="date" 
                            id="dob" 
                            name="dob" 
                            class="form-control border rounded w-full p-2"
                            value="{{ old('dob') }}" 
                            required
                        >
                        @error('dob') <small class="text-red-600">{{ $message }}</small> @enderror
                    </div>

                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 font-medium">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            class="form-control border rounded w-full p-2"
                            value="{{ old('email') }}" 
                            required
                            maxlength="255"
                        >
                        @error('email') <small class="text-red-600">{{ $message }}</small> @enderror
                    </div>

                    <div class="mb-4">
                        <label for="ssn" class="block text-gray-700 font-medium">Social Security Number (SSN)</label>
                        <input 
                            type="text" 
                            id="ssn" 
                            name="ssn" 
                            class="form-control border rounded w-full p-2"
                            value="{{ old('ssn') }}" 
                            required
                            pattern="\d{9}" 
                            title="SSN must be exactly 9 digits."
                        >
                        @error('ssn') <small class="text-red-600">{{ $message }}</small> @enderror
                    </div>

                    <div class="flex justify-end">
                        <button 
                            type="submit" 
                            style="background-color: black" 
                            class="bg-black-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
<script>
    document.getElementById('contactForm').addEventListener('submit', function (event) {
    const ssnField = document.getElementById('ssn');

    const ssnRegex = /^\d{9}$/;
    if (!ssnRegex.test(ssnField.value)) {
        event.preventDefault();
        alert('SSN must be exactly 9 digits.');
        ssnField.focus();
    }
});

</script>