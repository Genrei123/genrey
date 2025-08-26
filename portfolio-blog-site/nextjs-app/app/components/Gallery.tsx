import { sanityFetch } from "../../sanity/lib/live"
import { allGalleryImagesQuery } from "@/sanity/lib/queries"
import Onboarding from "./Onboarding"

export const AllGallery = async () => {
    const { data } = await sanityFetch({
        query: allGalleryImagesQuery,
    })

    if (!data || data.length === 0) {
        return <Onboarding />
    }

    return (
        <>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
                {data.map((image: any) => (
                    <div key={image.description} className="card bg-base-100 shadow-sm mb-4 break-inside-avoid">
                        <figure className="w-full rounded-sm">
                            <img
                                src={image.image.asset ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${image.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : "/placeholder.svg"}
                                alt={image.alt || "Gallery image"}
                                className="object-cover w-full h-auto hover:scale-105 transition-transform duration-300"
                            />
                        </figure>
                    </div>
                ))}
            </div>
        </>
    )
}