
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CamModelCard from './cam-model-card';

const CamModelSection = ({ section }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-bold text-center">{section.title}</h4>
      <div className="flex flex-col gap-4">
        {section.models.map(model => (
          <div key={model.name} className="group">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded">
              <CamModelCard model={model} />
            </div>
          </div>
        ))}
      </div>
      <Button variant="secondary" className="w-full justify-center bg-stone-800 hover:bg-stone-700 mt-auto">
        {section.buttonText}
      </Button>
    </div>
  );
};

export default CamModelSection;
