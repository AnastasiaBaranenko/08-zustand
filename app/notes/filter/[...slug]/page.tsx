import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { Metadata } from 'next';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }:NotesPageProps):Promise<Metadata>{
  const {slug} = await params;
  const tag = slug?.[0] || 'all';
  const formattedTag = tag === 'all' ? 'all' : tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

  return{
  title: `Note: ${tag}`,
  description: `Tag note: ${tag}`,

  openGraph:{
    title: `Note: ${formattedTag}`,
    description: `Tag note: ${tag}`,
    // url: 'http://localhost:3000/notes/filter/${formattedTag}',
    images: [
      {
           url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${tag}}`,
      }
    ],
  },
  }
}

export default async function NotesPages({ params }: NotesPageProps){
const {slug} = await params;
const queryClient = new QueryClient();
const rawTag = slug?.[0];
const tag = rawTag && rawTag.toLowerCase() !== 'all' ? rawTag : undefined;

const search="";
const page=1;  
  await queryClient.prefetchQuery({
    queryKey: ['notes', search, tag],
      queryFn: () => fetchNotes(search, page, tag as string)     
  });
  
    return(
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient 
         tag={tag as string} key={tag || 'all'}>
         </NotesClient>
         </HydrationBoundary>
        </section>
    )
      
}