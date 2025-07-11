import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function POST(request: NextRequest) {
  try {
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID!);

    const body = await request.json();
    const {
      fullName,
      organization,
      workEmail,
      role,
      dataInterests,
      preferredRegions,
      dataSpecs,
      dataLicensingType,
      intendedUseCase,
      timeline,
      customPilot,
      additionalComments,
    } = body;

    if (!fullName || !workEmail) {
      return NextResponse.json(
        { error: 'Full Name and Work Email are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Check for duplicate by Work Email
    const existingRecords = await base('For Data Buyers').select({
      filterByFormula: `{Work Email} = '${workEmail}'`,
      maxRecords: 1,
    }).firstPage();
    if (existingRecords.length > 0) {
      return NextResponse.json(
        { error: 'An application with this email address has already been submitted.' },
        { status: 409 }
      );
    }

    // Prepare data for Airtable
    const airtableData = {
      'Full Name': fullName,
      'Organization / Company': organization || '',
      'Work Email': workEmail,
      'Role': role || '',
      'Data Interests': dataInterests && Array.isArray(dataInterests) ? dataInterests : [],
      'Preferred Regions': preferredRegions || '',
      'Data Specs / Format Requirements': dataSpecs || '',
      'Data Licensing Type': dataLicensingType || '',
      'Intended Use Case': intendedUseCase || '',
      'Timeline to Access Data': timeline || '',
      'Interested in Custom Pilot': customPilot || '',
      'Additional Comments / Requirements': additionalComments || '',
      //'Submission Date': new Date().toISOString().split('T')[0],
    };

    const record = await base('For Data Buyers').create([
      { fields: airtableData },
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Buyer application submitted successfully',
        recordId: record[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting buyer form:', error);
    return NextResponse.json(
      { error: 'Failed to submit buyer application. Please try again.' },
      { status: 500 }
    );
  }
} 