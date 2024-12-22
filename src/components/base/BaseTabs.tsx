import { Tab } from "@headlessui/react";
import clsx from "clsx";

interface TabItem {
  id: number;
  content: React.ReactNode;
}

interface TabsProps {
  categories: Record<string, TabItem[]>;
}

export const BaseTabs: React.FC<TabsProps> = ({ categories }) => {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsx(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-black shadow"
                    : "text-blue-900 hover:bg-white hover:text-white",
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className="w-full rounded-lg bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              {posts.map((post) => (
                <div key={post.id}>{post.content}</div>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export type { TabItem, TabsProps };
