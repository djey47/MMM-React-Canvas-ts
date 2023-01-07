/**
 * Magic Mirror
 * Server side part of module.
 */

// provided dependency (MM2)
import * as NodeHelper from 'node_helper';
import * as NodeHelperImpl from './helper_impl';

module.exports = NodeHelper.create(NodeHelperImpl);
