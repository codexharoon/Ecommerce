import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("cm2g4cyn80001b7mbbgjlackm");
  return (
    <div>
      <Container>
        <div className="space-y-10 pb-10">
          <Billboard data={billboard} />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
