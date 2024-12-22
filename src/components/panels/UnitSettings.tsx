import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SettingsContext } from "../../provider/SettingsContext";

export const UnitSettings = () => {
  const { register, watch, setValue } = useForm<{ unit: string }>({
    defaultValues: { unit: "meters" },
  });
  const unit = watch("unit") as "yards" | "meters";

  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      unit,
    }));
  }, [unit, setSettings]);

  useEffect(() => {
    setValue("unit", settings.unit);
  }, [settings.unit, setValue]);

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <input type="radio" {...register("unit")} value="yards" />
        Yards
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" {...register("unit")} value="meters" />
        Meters
      </label>
    </div>
  );
};
