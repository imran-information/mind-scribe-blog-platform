import BlogDetailsClient from "@/app/components/BlogDetailsClient/BlogDetailsClient";


export default function BlogDetailsPage({ params }) {
  return <BlogDetailsClient id={params._id} />;
}
