/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import { Colors } from './colors.js';

type Step = 'selection' | 'commandName' | 'commandPrompt' | 'done';

const WIZARD_OPTIONS = [
  { label: 'Custom slash command', value: 'command' },
  { label: 'Agent', value: 'agent' },
];

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <Text color={Colors.Gray}>Step {current} of {total}</Text>
);

export function CreateWizard({
  onComplete,
}: {
  onComplete: (result: { name: string; prompt: string } | null) => void;
}) {
  const [step, setStep] = useState<Step>('selection');
  const [commandName, setCommandName] = useState('');
  const [commandPrompt, setCommandPrompt] = useState('');

  useInput((_input, key) => {
    if (key.escape) {
      onComplete(null);
      setStep('done');
    }
  });

  const handleSelect = (item: { value: string }) => {
    if (item.value === 'agent') {
      onComplete(null);
      setStep('done');
      return;
    }
    setStep('commandName');
  };

  const handleNameSubmit = (value: string) => {
    setCommandName(value);
    setStep('commandPrompt');
  };

  const handlePromptSubmit = (value: string) => {
    onComplete({ name: commandName, prompt: value });
    setStep('done');
  };

  const renderStep = () => {
    switch (step) {
      case 'selection':
        return (
          <>
            <StepIndicator current={1} total={3} />
            <Text color={Colors.AccentCyan}>Let's create something! What would you like to create?</Text>
            <SelectInput
              items={WIZARD_OPTIONS}
              onSelect={handleSelect}
              itemComponent={({ label, isSelected }) => {
                const isAgent = label === 'Agent';
                let color: string | undefined = isSelected ? Colors.AccentGreen : undefined;
                if (isAgent) {
                  color = Colors.Gray;
                }

                return (
                  <Box>
                    <Text color={color} strikethrough={isAgent}>
                      {label}
                    </Text>
                    {isAgent && <Text color={Colors.Gray}> (Coming soon)</Text>}
                  </Box>
                );
              }}
            />
          </>
        );
      case 'commandName':
        return (
          <Box flexDirection="column">
            <StepIndicator current={2} total={3} />
            <Text color={Colors.AccentCyan}>Enter the name of your slash command, e.g: summarize-project:</Text>
            <Box width="100%">
              <TextInput
                value={commandName}
                onChange={setCommandName}
                onSubmit={handleNameSubmit}
              />
            </Box>
          </Box>
        );
      case 'commandPrompt':
        return (
          <Box flexDirection="column">
            <StepIndicator current={3} total={3} />
            <Text color={Colors.AccentCyan}>What should the command do? Enter the prompt to be executed when this slash command is used:</Text>
            <Box width="100%">
              <TextInput
                value={commandPrompt}
                onChange={setCommandPrompt}
                onSubmit={handlePromptSubmit}
              />
            </Box>
          </Box>
        );
      case 'done':
        return null;
    }
  };

  return (
    <Box
      borderStyle="round"
      borderColor={Colors.AccentPurple}
      paddingX={2}
      paddingY={1}
      flexDirection="column"
      width="80%"
    >
      <Box marginBottom={1}>
        <Text bold>Create New...</Text>
      </Box>
      {renderStep()}
    </Box>
  );
}
