'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  pays: yup.string().required('Le pays est requis'),
  region: yup.string().required('Le region est requis'),
  village: yup.string().required('village requis'),
  distance: yup.number().integer().required('distance requis'),
});

type FormData = yup.InferType<typeof schema>;

export default function InscriptionForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {

    const dataToSend = {
      nom: data.nom,
      pays: data.pays,
      region: data.region,
      village: data.village,
      distance: data.distance,
    
    };
    try {
     const reponse =  await axios.post('http://localhost:4400/signup', {
        ...dataToSend,
      });   
      
  
    
      if ( reponse.data.Error === true ){
        alert(  reponse.data.Message )
        return
      }else{

        router.push('/');
      }
      router.push('/');
    } catch (error) {
      alert('Erreur lors de l’inscription + ' + error );
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 ml-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Inscription
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            type="text"
            {...register('nom')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Votre nom"
          />
          <p className="text-sm text-red-500">{errors.nom?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">pays</label>
          <input
            type="text"
            {...register('pays')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Votre pays"
          />
          <p className="text-sm text-red-500">{errors.pays?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">region</label>
          <input
            type="text"
            {...register('region')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Votre region"
          />
          <p className="text-sm text-red-500">{errors.region?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">village</label>
          <input
            type="email"
            {...register('village')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Votre village"
          />
          <p className="text-sm text-red-500">{errors.village?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">distance</label>
          <input
            type="text"
            {...register('distance')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Votre diastance"
          />
          <p className="text-sm text-red-500">{errors.distance?.message}</p>
        </div>




        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
