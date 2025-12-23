// export const apiVersion =
//   process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-01'

// export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;


export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-01';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!projectId || !dataset) {
  throw new Error('Missing Sanity configuration: check NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env');
}
