// seed/place.ts
import { Types } from 'mongoose';
import Place from '../models/place';

import { IPlace } from '../types/place';

interface ISeederPlaces {
  userId: Types.ObjectId;
  username: string;
}

export async function seedBeautifulPlaces({ userId, username }: ISeederPlaces) {
  const existingPlaces = await Place.countDocuments();
  if (existingPlaces > 0) {
    console.log('🌍 Places already seeded. Skipping...');
    return;
  }

  const defaultPlaces: IPlace[] = [
    {
      title: 'Raja Ampat',
      description: 'A paradise of marine life in West Papua.',
      imageUrl:
        'https://images.unsplash.com/photo-1703769605314-18648cfc3428?q=80&w=1485&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'West Papua',
      category: 'Island',
      createdBy: {
        _id: userId,
        username,
      },
    },
    {
      title: 'Borobudur Temple',
      description: 'A magnificent Buddhist temple from the 9th century.',
      imageUrl:
        'https://images.unsplash.com/photo-1620549146396-9024d914cd99?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Magelang, Central Java',
      category: 'Temple',
      createdBy: userId,
    },
    {
      title: 'Bromo Mountain',
      description: 'A scenic volcanic mountain in East Java.',
      imageUrl:
        'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'East Java',
      category: 'Mountain',
      createdBy: userId,
    },
    {
      title: 'Komodo Island',
      description: 'Home of the Komodo dragons.',
      imageUrl:
        'https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'East Nusa Tenggara',
      category: 'Island',
      createdBy: userId,
    },
    {
      title: 'Ubud Rice Terrace',
      description: 'Beautiful rice paddies in Bali.',
      imageUrl:
        'https://images.unsplash.com/photo-1694967456363-78bf85deaa17?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Bali',
      category: 'Village',
      createdBy: userId,
    },
  ];

  await Place.insertMany(defaultPlaces);
  console.log('🌱 Default places inserted');
}
