import Section from "@/components/Section/page";

export default function Home() {

  return (
    <div className=" px-24 py-12">
      <header className=" text-4xl font-semibold pb-6">
        <h1>
          <span className=" pr-2">
            <i className="fa-regular fa-square-check text-gray-400"></i>
          </span>
          Ein KanBan
        </h1>
      </header>
      <hr />
      <main className={` pt-6`}>
        <div className=" flex flex-wrap gap-x-4 gap-y-6">
          <Section
            name="Requested"
            bg50="bg-gray-50"
            bg100="bg-gray-100"
            bg200="bg-gray-200"
            bg500="bg-gray-500"
            text200="text-gray-200"
          />
          <Section
            name="In progress"
            bg50="bg-blue-50"
            bg100="bg-blue-100"
            bg200="bg-blue-200"
            bg500="bg-blue-500"
            text200="text-blue-200"
          />
          <Section
            name="Done"
            bg50="bg-green-50"
            bg100="bg-green-100"
            bg200="bg-green-200"
            bg500="bg-green-500"
            text200="text-green-200"
          />
        </div>
      </main>
    </div>
  );
}
