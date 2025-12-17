import { redirect } from 'next/navigation';

/**
 * Blog Page - Redirects to external blog URL
 * 
 * This page handles redirection to the external blog URL while preserving
 * any query parameters that were passed in the original request.
 * 
 * Example:
 * - /blog -> redirects to https://www.gurkanfikretgunak.com
 * - /blog?page=2 -> redirects to https://www.gurkanfikretgunak.com?page=2
 */

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // External blog URL
  const blogUrl = 'https://www.gurkanfikretgunak.com';
  
  // Get query parameters from the request
  const queryString = new URLSearchParams();
  
  // Preserve all query parameters
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(v => queryString.append(key, v));
      } else {
        queryString.set(key, value);
      }
    }
  });
  
  // Construct the final URL with query parameters
  const finalUrl = queryString.toString() 
    ? `${blogUrl}?${queryString.toString()}`
    : blogUrl;
  
  // Perform server-side redirect
  redirect(finalUrl);
}
