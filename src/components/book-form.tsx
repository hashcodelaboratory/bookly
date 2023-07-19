import {Button, Grid, Spacer, useInput} from "@nextui-org/react";
import {useValidation} from "bookly/hook/use-validation";
import {SyntheticEvent} from "react";
import {Input} from "bookly/molecules/input";
import {TextArea} from "bookly/molecules/text-area";
import {withBookContext} from "bookly/context/with-book-context";
import {useBookContext} from "bookly/context/use-book-context";
import {v4} from "uuid";

const DESCRIPTION_MAX_LENGTH = 300

export const BookForm = () => {
  const { addBook } = useBookContext()

  const {value: title, reset: titleReset, bindings: titleBindings} = useInput("");
  const {value: author, reset: authorReset, bindings: authorBindings} = useInput("");
  const {value: description, reset: descriptionReset, bindings: descriptionBindings} = useInput("");
  const {enabled, enableValidation, disableValidation, color, isValid} = useValidation(titleBindings.value);

  const resetForm = () => {
    titleReset()
    authorReset()
    descriptionReset()
    disableValidation()
  }

  const onSubmitAction = (event: SyntheticEvent) => {
    event.preventDefault()

    if (!enabled) {
      enableValidation()
    }

    if (!isValid) {
      return
    }

    addBook({ title, author, description, key: v4() })
    resetForm()
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
            <TextArea
              bindings={descriptionBindings}
              label="Description"
              placeholder="e.g. A thrilling adventure awaits as our heroes embark on a quest to find the lost city."
              maxLength={DESCRIPTION_MAX_LENGTH}
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