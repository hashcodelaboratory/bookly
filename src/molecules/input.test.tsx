import React from "react"
import {Input} from "bookly/molecules/input";
import {expect} from '@jest/globals';
import {render} from "@testing-library/react";

const renderTestComponent = () => render(<Input bindings={{value: 'test value', onChange: () => {}}} id="test-id" status="primary" label="Test label" placeholder="Test placeholder"/>)

describe('Input', () => {
  describe('on render', () => {
    it('should render label with exact matching notation', () => {
      const {getByText} = renderTestComponent()

      const label= getByText('Test label')

      expect(label).toBeDefined()
    })
  })
})