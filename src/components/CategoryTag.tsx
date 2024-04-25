import React from "react";

type CategoryTagProps = {
  categories: string[]
};

function CategoryTag(props: CategoryTagProps) {
  const { categories } = props;
  return(
    <div className="flex">
      {categories.map((category: string, index: number) => {
        return(
          <p key={index} className="border rounded border-blue-600 text-blue-600 mr-2 p-1">{category}</p>
        )
      })}
    </div>
  )
}

export default CategoryTag