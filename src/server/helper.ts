/**
 * Magic Mirror
 * Server side part of module.
 */

// provided dependency (MM2)
import * as NodeHelperImpl from './helper_impl';
import { NodeHelper } from './utils/mm2_facades';

module.exports = NodeHelper.create(NodeHelperImpl);
