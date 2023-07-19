import {Button, Grid, Spacer, Textarea} from "@nextui-org/react";
import {BindingsChangeTarget} from "@nextui-org/react/types/use-input/use-input";
import {useValidation} from "bookly/hook/use-validation";
import {SyntheticEvent} from "react";
import {Input} from "bookly/molecules/input";

type BookFormProps = {
  titleBindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  }
  authorBindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  }
  descriptionBindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  }
  onSubmit: () => void;
}

export const BookForm = ({titleBindings, authorBindings, descriptionBindings, onSubmit}: BookFormProps) => {
  const {enabled, enableValidation, disableValidation, color, isValid} = useValidation(titleBindings.value);

  const onSubmitAction = (event: SyntheticEvent) => {
    event.preventDefault()

    if (!enabled) {
      enableValidation()
    }

    if (!isValid) {
      return
    }

    onSubmit()
    disableValidation()
  }


  return <form onSubmit={onSubmitAction}>
    <Grid.Container direction="column">
      <Grid>
        <Grid.Container direction="column">
          <Grid>
            <Grid.Container direction="row">
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs={12} sm="auto">
                <Input
                  status={color}
                  color={color}
                  helperColor={color}
                  helperText="* required"
                  bindings={titleBindings}
                  label="Title"
                  placeholder="e.g. The Lost City"
                />
              </Grid>
              {/* gap is not working as expected */}
              <Grid>
                <Spacer x={1}/>
              </Grid>
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs={12} sm="auto">
                <Input
                  status="primary"
                  bindings={authorBindings}
                  helperText="optional"
                  label="Author"
                  placeholder="e.g. John Doe"
                />
              </Grid>
            </Grid.Container>
          </Grid>
          {/* gap is not working as expected */}
          <Grid>
            <Spacer y={1.5}/>
          </Grid>
          <Grid>
            <Textarea
              animated={false}
              status="primary"
              {...descriptionBindings}
              helperText={`optional ${descriptionBindings.value.length} / 300`}
              label="Description"
              placeholder="e.g. A thrilling adventure awaits as our heroes embark on a quest to find the lost city."
              fullWidth
              maxLength={300}
            />
          </Grid>
        </Grid.Container>
      </Grid>
      {/* gap is not working as expected */}
      <Grid>
        <Spacer y={2}/>
      </Grid>
      <Grid>
        <Button size="lg" style={{width: '100%', zIndex: 1}} color="gradient" type="submit">Save</Button>
      </Grid>
    </Grid.Container>
  </form>

}