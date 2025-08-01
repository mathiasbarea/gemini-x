/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createCommand } from './createCommand.js';
import { type CommandContext } from './types.js';
import { createMockCommandContext } from '../../test-utils/mockCommandContext.js';

describe('createCommand', () => {
  let mockContext: CommandContext;

  beforeEach(() => {
    mockContext = createMockCommandContext();
  });

  it('should have the correct name and description', () => {
    expect(createCommand.name).toBe('create');
    expect(createCommand.description).toBe(
      'Show a wizard to create something new.',
    );
  });

  it('should return a dialog action to open the create dialog', () => {
    if (!createCommand.action) {
      throw new Error('The create command must have an action.');
    }

    const result = createCommand.action(mockContext, '');

    expect(result).toEqual({
      type: 'dialog',
      dialog: 'create',
    });
  });
});
