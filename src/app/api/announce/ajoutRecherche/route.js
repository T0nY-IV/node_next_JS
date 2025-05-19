import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Recherche from '@/models/Recherche';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  try {
    // Vérifier l'authentification
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Token invalide' },
        { status: 401 }
      );
    }

    // Connexion à la base de données
    await connectDB();

    // Récupérer les données de la requête
    const data = await req.json();
    
    // Vérifier que l'utilisateur est le même que celui du token
    if (data.userId !== decoded.userId) {
      return NextResponse.json(
        { message: 'Non autorisé à créer une recherche pour un autre utilisateur' },
        { status: 403 }
      );
    }

    // Créer la nouvelle recherche
    const recherche = new Recherche({
      depart: data.depart,
      destination: data.destination,
      dateDebut: data.dateDebut,
      bagage: data.bagage,
      Remarque: data.Remarque,
      userId: data.userId,
      status: 'active'
    });

    // Sauvegarder la recherche
    await recherche.save();

    return NextResponse.json(
      { message: 'Recherche créée avec succès', recherche },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erreur lors de la création de la recherche:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la création de la recherche', error: error.message },
      { status: 500 }
    );
  }
} 