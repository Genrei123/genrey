// components/Avatar.tsx
import Image from "next/image";

type Person = {
  firstName?: string;
  lastName?: string;
  image?: {
    asset?: {
      _ref?: string;
    };
  };
};

export default function Avatar({
  person,
  date,
}: {
  person: Person;
  date?: string;
}) {
  const imageRef = person.image?.asset?._ref;

  return (
    <div className="flex items-center">
      {imageRef && (
        <div className="mr-4 h-12 w-12 relative">
          <Image
            src={`https://cdn.sanity.io/images/${
              process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
            }/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${imageRef
              .replace("image-", "")
              .replace("-jpg", ".jpg")
              .replace("-png", ".png")
              .replace("-webp", ".webp")}`}
            className="rounded-full border-2 border-cyan-400"
            alt={
              person.firstName && person.lastName
                ? `${person.firstName} ${person.lastName}`
                : "Unknown author"
            }
            fill
            sizes="48px"
          />
        </div>
      )}
      <div className="text-sm text-gray-400">
        <p className="font-medium text-gray-200">
          {person.firstName && person.lastName
            ? `${person.firstName} ${person.lastName}`
            : "Unknown author"}
        </p>
        {date && (
          <div className="text-gray-400">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        )}
      </div>
    </div>
  );
}