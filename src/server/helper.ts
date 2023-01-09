/**
 * Magic Mirror 2
 * Helper side part of module.
 */

import * as NodeHelperImpl from './helper_impl';
import { NodeHelper } from './utils/mm2_facades';

module.exports = NodeHelper.create(NodeHelperImpl);
