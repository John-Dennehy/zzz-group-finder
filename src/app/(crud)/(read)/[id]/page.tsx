type ReadPageProps = {
  params: {
    id: string;
  };
};

export default function ReadPage({ params }: ReadPageProps) {
  return (
    <div>
      <h1>{`Read ${params.id} Placeholder`}</h1>
    </div>
  );
}
