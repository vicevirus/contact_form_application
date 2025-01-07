<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('View Contact Forms') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">{{ __('All Contact Forms') }}</h3>

                <div class="overflow-x-auto">
                    <table class="w-full table-auto border-collapse border border-gray-300">
                        <thead class="bg-gray-100">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    {{ __('Name') }}
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    {{ __('Date of Birth') }}
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    {{ __('Email') }}
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    {{ __('SSN') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @foreach ($contactForms as $contactForm)
                                <tr>
                                    <td class="px-6 py-4 text-sm text-gray-800">
                                        {{ $contactForm->name }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-800">
                                        {{ $contactForm->dob }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-800">
                                        {{ $contactForm->email }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-800">
                                        {{ $contactForm->ssn }}
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
