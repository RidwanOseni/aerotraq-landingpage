import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting API request...');
    
    // Initialize Airtable inside the handler
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID!);

    console.log('Airtable initialized with base ID:', process.env.AIRTABLE_BASE_ID);

    // Parse the request body
    const body = await request.json();
    
    // Destructure all fields from the request
    const {
      name,
      email,
      phone,
      company,
      role,
      droneUseCase,
      otherDroneUseCase,
      interest,
      challenge,
      agreedToTerms,
    } = body;
    
    if (!name || !email || !agreedToTerms) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and terms agreement are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('About to check for existing records with email:', email);

    // Check for existing record with the same email
    const existingRecords = await base('For Drone Operators').select({
      filterByFormula: `{Email} = '${email}'`,
      maxRecords: 1,
    }).firstPage();

    console.log('Existing records found:', existingRecords.length);

    if (existingRecords.length > 0) {
      return NextResponse.json(
        { error: 'An application with this email address has already been submitted. Please use a different email or contact us if you need to update your application.' },
        { status: 409 }
      );
    }

    console.log('No duplicates found, proceeding to create record...');

    // Prepare data for Airtable with exact field names
    const airtableData = {
      'Name': name,
      'Email': email,
      'Phone': phone || '',
      'Company/Organization': company || '',
      'Your Role': role || '',
      'Primary Drone Use Case': droneUseCase === 'other' ? 'Other' : droneUseCase,
      'Other Use Case Description': droneUseCase === 'other' ? (otherDroneUseCase || '') : '',
      'Excitement about Aerotraq': interest && Array.isArray(interest) ? interest : [],
      'Biggest Challenge': challenge || '',
      'Terms Agreement': agreedToTerms,
      'Submission Date': new Date().toISOString().split('T')[0],
    };

    console.log('About to create record in Airtable...');

    // Create record in Airtable
    const record = await base('For Drone Operators').create([
      {
        fields: airtableData,
      },
    ]);

    console.log('Record created successfully:', record[0].id);

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        recordId: record[0].id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    
    // Handle specific Airtable errors
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID') || error.message.includes('BASE_NOT_FOUND')) {
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
} 