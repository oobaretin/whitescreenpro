import { HomePageClient } from "@/components/HomePageClient";
import { HomeStaticSeo } from "@/components/HomeStaticSeo";

export default function Home() {
  return <HomePageClient seoIndex={<HomeStaticSeo />} />;
}
