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
            <div className="flex justify-center items-center flex-wrap">
                {data.map((image: any) => (
                    <div key={image.description} className="card bg-base-100 w-96 shadow-sm mr-4 mb-4 w-1/3">
                        <figure className="w-full h-64">
                            <img
                                src={image.image.asset ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${image.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : "/placeholder.svg"}
                                alt={image.alt || "Gallery image"}
                                className="object-cover w-full h-full"
                            />
                        </figure>
                        
                    </div>
                ))}
            </div>
        </>
    )
}